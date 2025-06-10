import React from 'react';
import styles from './InfoPanel.module.scss';

export const InfoPanel = ({ clickValue, autoClickerRate, passiveRate, totalClicks }) => {
  return (
    <div className={styles.infoPanel}>
      <h3 className={styles.title}>Income Info</h3>
      <div className={styles.infoItem}>
        <span>Click Value:</span>
        <span className={styles.value}>{clickValue.toLocaleString()}</span>
      </div>
      <div className={styles.infoItem}>
        <span>Auto Clicks/sec:</span>
        <span className={styles.value}>{autoClickerRate.toFixed(1)}</span>
      </div>
      <div className={styles.infoItem}>
        <span>Passive Income/sec:</span>
        <span className={styles.value}>{passiveRate}</span>
      </div>
      <div className={styles.infoItem}>
        <span>Total Clicks:</span>
        <span className={styles.value}>{totalClicks.toLocaleString()}</span>
      </div>
    </div>
  );
};