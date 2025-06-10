import React from 'react';
import styles from './Header.module.scss';

export const Header = ({ credits, duiktcoins, prestigeCount, skinColor }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title} style={{ color: skinColor }}>
        Duikt Clicker
      </h1>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Credits:</span>
          <span className={styles.statValue}>{credits.toLocaleString()}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Duiktcoins:</span>
          <span className={styles.statValue}>{duiktcoins}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Prestige:</span>
          <span className={styles.statValue}>{prestigeCount}</span>
        </div>
      </div>
    </div>
  );
};