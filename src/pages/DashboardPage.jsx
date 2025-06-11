import React, { useState, useCallback } from "react";
import useCampaigns from "../hooks/useCampaigns";

import EmeraldAccountBalance from "../features/campaigns/EmeraldAccountBalance/EmeraldAccountBalance";

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
      </div>
    </div>
  );
}

export default DashboardPage;
