import React from 'react';
import styles from './ClickButton.module.scss';

export const ClickButton = ({ 
  onClick, 
  disabled, 
  clickAnimation, 
  comboCount, 
  numberPopups 
}) => {
  return (
    <div className={styles.clickArea}>
      <button 
        className={`${styles.clickButton} ${clickAnimation ? styles.clicked : ''} ${disabled ? styles.disabled : ''}`}
        onClick={onClick}
        disabled={disabled}
      >
        <span className={styles.clickIcon}>💎</span>
        <span className={styles.clickText}>CLICK ME!</span>
      </button>
      
      {comboCount > 0 && (
        <div className={styles.comboIndicator}>
          Combo x{comboCount}
        </div>
      )}
      
      <div className={styles.numberPopups}>
        {numberPopups.map(popup => (
          <div 
            key={popup.id} 
            className={`${styles.numberPopup} ${popup.isLucky ? styles.lucky : ''}`}
          >
            +{Math.floor(popup.amount).toLocaleString()}
            {popup.isLucky && ' LUCKY!'}
          </div>
        ))}
      </div>
    </div>
  );
};