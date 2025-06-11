import React from "react";
import styles from "./CampaignItem.module.scss";
import { formatCurrency } from "../../../../utils/formatters";
import Button from "../../../../components/Button/Button";
import { FaEdit, FaTrashAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const CampaignItem = ({ campaign, onDelete, onEdit }) => {
  return (
    <div className={styles.campaignItem}>
      <h3 className={styles.campaignName}>{campaign.name}</h3>

      <div className={styles.detailsGrid}>
        <p className={styles.detailItem}>
          Słowa kluczowe:{" "}
          <span className={styles.value}>{campaign.keywords.join(", ")}</span>
        </p>
        <p className={styles.detailItem}>
          Kwota Bid:{" "}
          <span className={styles.value}>
            {formatCurrency(campaign.bidAmount)}
          </span>
        </p>
        <p className={styles.detailItem}>
          Fundusz Kampanii:{" "}
          <span className={styles.value}>
            {formatCurrency(campaign.campaignFund)}
          </span>
        </p>
        <p className={styles.detailItem}>
          Miasto: <span className={styles.value}>{campaign.town || "N/A"}</span>
        </p>
        <p className={styles.detailItem}>
          Promień: <span className={styles.value}>{campaign.radius} km</span>
        </p>
      </div>

      <div className={styles.statusRow}>
        <span
          className={`${styles.statusBadge} ${
            campaign.status === "on" ? styles.statusOn : styles.statusOff
          }`}
        >
          {campaign.status === "on" ? (
            <>
              <FaToggleOn /> Włączona
            </>
          ) : (
            <>
              <FaToggleOff /> Wyłączona
            </>
          )}
        </span>
      </div>

      <div className={styles.actions}>
        <Button onClick={() => onEdit(campaign)} variant="iconSecondary">
          <FaEdit /> Edytuj
        </Button>
        <Button onClick={() => onDelete(campaign)} variant="iconDanger">
          <FaTrashAlt /> Usuń
        </Button>
      </div>
    </div>
  );
};

export default CampaignItem;