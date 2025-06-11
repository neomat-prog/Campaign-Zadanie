import React, { useState } from "react";
import CampaignItem from "./components/CampaignItem";
import styles from "./CampaignsOverview.module.scss"; 
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";

const CampaignsOverview = ({ campaigns, onDelete, onEdit, onAddCampaign }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);

  const handleDeleteClick = (campaign) => {
    setCampaignToDelete(campaign);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (campaignToDelete) {
      onDelete(campaignToDelete.id);
      setIsModalOpen(false);
      setCampaignToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCampaignToDelete(null);
  };

  return (
    <section className={styles.campaignsOverviewSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Twoje Kampanie</h2>
        <Button onClick={onAddCampaign} variant="primary">
          + Dodaj Nową Kampanię
        </Button>
      </div>

      {campaigns.length === 0 ? (
        <p className={styles.noCampaigns}>
          Brak aktywnych kampanii. Dodaj nową kampanię, aby rozpocząć!
        </p>
      ) : (
        <div className={styles.campaignsGrid}>
          {campaigns.map((campaign) => (
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
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          title="Potwierdź usunięcie"
          message={`Czy na pewno chcesz usunąć kampanię "${campaignToDelete.name}"? Tej operacji nie można cofnąć.`}
        />
      )}
    </section>
  );
};

export default CampaignsOverview;