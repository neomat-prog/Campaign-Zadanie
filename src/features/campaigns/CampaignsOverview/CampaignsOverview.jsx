import React, { useState } from "react";
import CampaignItem from "./components/CampaignItem";
import styles from "./CampaignList.module.scss";
import Modal from "../../../components/Modal/Modal";

const CampaignOverview = ({ campaigns, onDelete, onEdit }) => {
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

  if (!campaigns || campaigns.length === 0) {
    return (
      <section className={styles.campaignListSection}>
        <h2 className={styles.listTitle}>Twoje Kampanie</h2>
        <p className={styles.noCampaigns}>
          Brak aktywnych kampanii. Dodaj nową kampanię, aby rozpocząć!
        </p>
      </section>
    );
  }

  return (
    <section className={styles.campaignListSection}>
      <h2 className={styles.listTitle}>Twoje Kampanie</h2>
      <div className={styles.campaignGrid}>
        {campaigns.map((campaign) => (
          <CampaignItem
            key={campaign.id}
            campaign={campaign}
            onDelete={() => handleDeleteClick(campaign)}
            onEdit={onEdit}
          />
        ))}
      </div>

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

export default CampaignOverview;
