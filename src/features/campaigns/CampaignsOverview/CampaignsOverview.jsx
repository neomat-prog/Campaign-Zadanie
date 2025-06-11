import React, { useState } from "react";
import CampaignItem from "./components/CampaignItem";
import styles from "./CampaignsOverview.module.scss";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

const CampaignsOverview = ({ campaigns, onDelete, onEdit, onAddCampaign }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const handleDeleteClick = (campaign) => {
    setCampaignToDelete(campaign);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (campaignToDelete) {
      onDelete(campaignToDelete.id);
      setIsDeleteModalOpen(false);
      setCampaignToDelete(null);
      setFilterText("");
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCampaignToDelete(null);
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleApplyFilter = () => {
    setIsFilterModalOpen(false);
  };

  const handleClearFilter = () => {
    setFilterText("");
    setIsFilterModalOpen(false);
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <section className={styles.campaignsOverviewSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Twoje Kampanie</h2>
        <Button onClick={onAddCampaign} variant="primary">
          + Dodaj Nową Kampanię
        </Button>
        <Button onClick={handleOpenFilterModal} variant="primary">
          Filtruj Kampanie
        </Button>
      </div>

      {filteredCampaigns.length === 0 && filterText === "" ? (
        <p className={styles.noCampaigns}>
          Brak aktywnych kampanii. Dodaj nową kampanię, aby rozpocząć!
        </p>
      ) : filteredCampaigns.length === 0 && filterText !== "" ? (
        <p className={styles.noCampaigns}>
          Brak kampanii spełniających kryteria wyszukiwania.
        </p>
      ) : (
        <div className={styles.campaignsGrid}>
          {filteredCampaigns.map((campaign) => (
            <CampaignItem
              key={campaign.id}
              campaign={campaign}
              onDelete={() => handleDeleteClick(campaign)}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}

      {campaignToDelete && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Potwierdź usunięcie"
          message={`Czy na pewno chcesz usunąć kampanię "${campaignToDelete.name}"? Tej operacji nie można cofnąć.`}
        />
      )}

      <Modal isOpen={isFilterModalOpen} onClose={handleCloseFilterModal}>
        <div className={styles.filterModalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Filtruj Kampanie</h2>
            <button
              className={styles.closeButton}
              onClick={handleCloseFilterModal}
            >
              &times;
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <Input
                label="Filtruj po nazwie kampanii"
                id="campaignFilter"
                name="campaignFilter"
                value={filterText}
                onChange={handleFilterTextChange}
                placeholder="Wpisz nazwę kampanii..."
              />
            </div>
          </div>
          <div className={styles.modalFooter}>
            <Button onClick={handleClearFilter} variant="secondary">
              Wyczyść filtr
            </Button>
            <Button onClick={handleCloseFilterModal} variant="secondary">
              Anuluj
            </Button>
            <Button onClick={handleApplyFilter} variant="primary">
              Zastosuj filtr
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default CampaignsOverview;
