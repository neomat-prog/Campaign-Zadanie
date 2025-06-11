import React from "react";
import styles from "./DashboardPage.module.scss";
import useCampaigns from "../hooks/useCampaign";
import EmeraldAccounBalance from "../features/campaigns/EmeraldAccountBalance/EmeraldAccountBalance";

const DashboardPage = () => {
  const { emeraldBalanace } = useCampaigns;

  return (
    <div>
      <header>
        <h1 className={styles.appTitle}>Manage Your Campaigns</h1>
        <div className={styles.userProfile}>
          <p className={styles.greeting}>Hi User!</p>
        </div>
      </header>

      <div className={styles.mainDashboardContent}>
        <EmeraldAccounBalance balance={emeraldBalanace}/>
      </div>
    </div>
  );
};

export default DashboardPage;
