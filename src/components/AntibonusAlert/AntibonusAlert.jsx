import React from 'react';
import styles from './AntibonusAlert.module.scss';

export const AntibonusAlert = ({ antibonus, timer }) => {
  const timerPercent = (timer / antibonus.duration) * 100;
  
  return (
    <div className={styles.antibonusAlert}>
      <span className={styles.icon}>{antibonus.icon}</span>
      <span className={styles.name}>{antibonus.name}</span>
      <span className={styles.effect}>{antibonus.effect}</span>
      <div className={styles.timer}>
        <div 
          className={styles.timerFill}
          style={{ width: `${timerPercent}%` }}
        />
      </div>
    </div>
  );
};