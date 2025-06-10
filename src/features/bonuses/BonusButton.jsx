import React from 'react';
import styles from './Bonuses.module.scss';

export const BonusButton = ({ name, icon, price, currency, onClick, disabled, special }) => {
  return (
    <button 
      className={`${styles.button} ${disabled ? styles.disabled : ''} ${special ? styles.special : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.name}>{name}</span>
      <span className={styles.price}>{price.toLocaleString()} {currency}</span>
    </button>
  );
};