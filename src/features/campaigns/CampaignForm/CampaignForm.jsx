import React, { useState, useEffect } from "react";
import styles from "./CampaignForm.module.scss";

import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import Button from "../../../components/Button/Button";

const generateUniqueId = () => String(Date.now());

const CampaignForm = ({
  onSubmit,
  initialData,
  onCancel,
  emeraldBalance,
  availableTowns,
  prePopulatedKeywords,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    keywords: [],
    keywordInput: "",
    bidAmount: "",
    campaignFund: "",
    status: "on",
    town: "",
    radius: "",
  });
  const [errors, setErrors] = useState({});
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name,
        keywords: initialData.keywords,
        keywordInput: "",
        bidAmount: initialData.bidAmount,
        campaignFund: initialData.campaignFund,
        status: initialData.status,
        town: initialData.town || "",
        radius: initialData.radius,
      });
    } else {
      setFormData({
        name: "",
        keywords: [],
        keywordInput: "",
        bidAmount: "",
        campaignFund: "",
        status: "on",
        town: "",
        radius: "",
      });
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? "on" : "off") : value,
    }));
  };

  // Handle Keywords e.g auto, promocja etc.

  const handleKeywordInputChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, keywordInput: value }));

    if (value.length > 0) {
      setSuggestedKeywords(
        prePopulatedKeywords
          .filter(
            (keyword) =>
              keyword.toLowerCase().includes(value.toLowerCase()) &&
              !formData.keywords.includes(keyword)
          )
          .slice(0, 5)
      );
    } else {
      setSuggestedKeywords([]);
    }
  };

  const addKeyword = (keyword) => {
    if (keyword && !formData.keywords.includes(keyword)) {
      setFormData((prevData) => ({
        ...prevData,
        keywords: [...prevData.keywords, keyword],
        keywordInput: "",
      }));
      setSuggestedKeywords([]);
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      keywords: prevData.keywords.filter(
        (keyword) => keyword !== keywordToRemove
      ),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Nazwa kampanii jest obowiązkowa.";
    }
    if (formData.keywords.length === 0) {
      newErrors.keywords = "Słowa kluczowe są obowiązkowe.";
    }
    const bid = parseFloat(formData.bidAmount);
    if (isNaN(bid) || bid <= 0) {
      newErrors.bidAmount = "Kwota oferty musi być liczbą większą od zera.";
    }
    const fund = parseFloat(formData.campaignFund);
    if (isNaN(fund) || fund <= 0) {
      newErrors.campaignFund =
        "Fundusz kampanii musi być liczbą większą od zera.";
    } else if (!initialData && fund > emeraldBalance) {
      newErrors.campaignFund = `Brak wystarczających środków. Dostępne: ${emeraldBalance.toFixed(
        2
      )} PLN.`;
    } else if (initialData) {
      const oldFund = initialData.campaignFund;
      const fundDifference = fund - oldFund;
      if (fundDifference > 0 && emeraldBalance < fundDifference) {
        newErrors.campaignFund = `Brak wystarczających środków na zwiększenie funduszu. Potrzeba: ${fundDifference.toFixed(
          2
        )} PLN.`;
      }
    }

    const radius = parseFloat(formData.radius);
    if (isNaN(radius) || radius <= 0) {
      newErrors.radius = "Promień musi być liczbą większą od zera.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const campaignData = {
        id: initialData ? initialData.id : generateUniqueId(),
        name: formData.name,
        keywords: formData.keywords,
        bidAmount: parseFloat(formData.bidAmount),
        campaignFund: parseFloat(formData.campaignFund),
        status: formData.status,
        town: formData.town,
        radius: parseFloat(formData.radius),
      };
      const success = onSubmit(campaignData);

      if (!initialData && success !== false) {
        setFormData({
          name: "",
          keywords: [],
          keywordInput: "",
          bidAmount: "",
          campaignFund: "",
          status: "on",
          town: "",
          radius: "",
        });
        setErrors({});
      }
    }
  };

  const townOptions = availableTowns.map((town) => ({
    value: town,
    label: town,
  }));

  return (
    <div className={styles.campaignFormWrapper}>
      {" "}
      
      <h2 className={styles.formTitle}>
        {initialData ? "Edytuj Kampanię" : "Dodaj Nową Kampanię"}
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Nazwa Kampanii *"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <div className={styles.formGroup}>
          <label htmlFor="keywordInput">Słowa kluczowe *</label>
          <Input
            id="keywordInput"
            name="keywordInput"
            value={formData.keywordInput}
            onChange={handleKeywordInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && formData.keywordInput.trim()) {
                e.preventDefault();
                addKeyword(formData.keywordInput.trim());
              }
            }}
            placeholder="Wpisz słowo kluczowe i naciśnij Enter lub wybierz sugestię"
            error={errors.keywords}
          />
          {suggestedKeywords.length > 0 && (
            <div className={styles.suggestions}>
              {suggestedKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className={styles.suggestionTag}
                  onClick={() => addKeyword(keyword)}
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
          <div className={styles.keywordTags}>
            {formData.keywords.map((keyword) => (
              <span key={keyword} className={styles.keywordTag}>
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className={styles.removeTag}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          {errors.keywords && (
            <p className={styles.errorText}>{errors.keywords}</p>
          )}
        </div>

        <Input
          label="Kwota Oferty * (PLN)"
          id="bidAmount"
          name="bidAmount"
          type="number"
          value={formData.bidAmount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          error={errors.bidAmount}
        />

        <Input
          label="Fundusz Kampanii * (PLN)"
          id="campaignFund"
          name="campaignFund"
          type="number"
          value={formData.campaignFund}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          error={errors.campaignFund}
        />

        <div className={styles.formGroup}>
          <label>Status *</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="status"
                value="on"
                checked={formData.status === "on"}
                onChange={handleChange}
              />{" "}
              Aktywna
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="off"
                checked={formData.status === "off"}
                onChange={handleChange}
              />{" "}
              Wyłączona
            </label>
          </div>
        </div>

        <Select
          label="Miasto"
          id="town"
          name="town"
          value={formData.town}
          onChange={handleChange}
          options={[
            { value: "", label: "Wybierz miasto (opcjonalnie)" },
            ...townOptions,
          ]}
        />

        <Input
          label="Promień * (km)"
          id="radius"
          name="radius"
          type="number"
          value={formData.radius}
          onChange={handleChange}
          min="1"
          error={errors.radius}
        />

        <div className={styles.formActions}>
          <Button type="submit" variant="primary">
            {initialData ? "Zapisz Zmiany" : "Dodaj Kampanię"}
          </Button>
          {initialData && (
            <Button type="button" onClick={onCancel} variant="secondary">
              Anuluj Edycję
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;