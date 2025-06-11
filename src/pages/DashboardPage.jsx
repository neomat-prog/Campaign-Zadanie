import React, { useState, useCallback } from "react";
import useCampaigns from "../hooks/useCampaigns";

import EmeraldAccountBalance from "../features/campaigns/EmeraldAccountBalance/EmeraldAccountBalance";
import CampaignsOverview from "../features/campaigns/CampaignsOverview/CampaignsOverview";
import CampaignForm from "../features/campaigns/CampaignForm/CampaignForm";
import Modal from "../components/Modal/Modal";

import styles from "./DashboardPage.module.scss";

function DashboardPage() {
  const {
    campaigns,
    emeraldBalance,
    editingCampaign,
    availableTowns,
    prePopulatedKeywords,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    handleEdit,
    handleCancelEdit,
  } = useCampaigns();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleOpenFormModal = useCallback(() => {
    setIsFormModalOpen(true);
  }, []);

  const handleCloseFormModal = useCallback(() => {
    setIsFormModalOpen(false);
    handleCancelEdit();
  }, [handleCancelEdit]);

  const handleDashboardFormSubmit = useCallback(
    (campaignData) => {
      let success = false;
      if (editingCampaign) {
        success = updateCampaign(campaignData);
      } else {
        success = addCampaign(campaignData);
      }

      if (success !== false) {
        handleCloseFormModal();
      }
      return success;
    },
    [editingCampaign, updateCampaign, addCampaign, handleCloseFormModal]
  );

  const handleEditFromList = useCallback(
    (campaign) => {
      handleEdit(campaign);
      handleOpenFormModal();
    },
    [handleEdit, handleOpenFormModal]
  );

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1 className={styles.appTitle}>Manage your Campaigns</h1>
        <div className={styles.userProfile}>
          <p className={styles.greeting}>Hi User!</p>
        </div>
      </header>

      <div className={styles.mainDashboardContent}>
        <EmeraldAccountBalance balance={emeraldBalance} />

        <CampaignsOverview
          campaigns={campaigns}
          onDelete={deleteCampaign}
          onEdit={handleEditFromList}
          onAddCampaign={handleOpenFormModal}
        />
      </div>

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        wide={true}
      >
        <CampaignForm
          onSubmit={handleDashboardFormSubmit}
          initialData={editingCampaign}
          onCancel={handleCloseFormModal}
          emeraldBalance={emeraldBalance}
          availableTowns={availableTowns}
          prePopulatedKeywords={prePopulatedKeywords}
        />
      </Modal>
    </div>
  );
}

export default DashboardPage;
