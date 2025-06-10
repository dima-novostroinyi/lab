import React from 'react';
import styles from './Upgrades.module.scss';

export const UpgradeCard = ({ upgrade, level, price, canAfford, onBuy }) => {
  return (
    <div className={`${styles.card} ${canAfford ? styles.affordable : ''}`}>
      <div className={styles.icon}>{upgrade.icon}</div>
      <div className={styles.info}>
        <h4 className={styles.name}>{upgrade.name}</h4>
        <p className={styles.description}>{upgrade.description}</p>
        <p className={styles.level}>Level: {level}</p>
      </div>
      <button 
        className={`${styles.button} ${!canAfford ? styles.disabled : ''}`}
        onClick={onBuy}
        disabled={!canAfford}
      >
        <span className={styles.price}>{price.toLocaleString()}</span>
        <span className={styles.currency}>credits</span>
      </button>
    </div>
  );
};