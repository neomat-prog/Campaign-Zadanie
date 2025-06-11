import React from "react";
import styles from "./EmeraldAccountBalance.module.scss";

const EmeraldAccountBalance = ({ balance }) => {
  return (
    <div className={styles.emeraldAccountBalanceCard}>
      <p className={styles.label}>Twój Stan Konta Emerald:</p>
      <p className={styles.balanceAmount}>{balance.toFixed(2)} PLN</p>
    </div>
  );
};

export default EmeraldAccountBalance;
