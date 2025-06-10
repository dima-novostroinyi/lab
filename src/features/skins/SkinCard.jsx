import React from 'react';
import styles from './Skins.module.scss';

export const SkinCard = ({ 
  skinKey, 
  skin, 
  isUnlocked, 
  isActive, 
  duiktcoins, 
  onBuy, 
  onSet 
}) => {
  const skinPrice = 10;
  
  return (
    <div 
      className={`${styles.card} ${isUnlocked ? styles.unlocked : ''} ${isActive ? styles.active : ''}`}
      style={{
        background: `linear-gradient(135deg, ${skin.colors.primary}, ${skin.colors.secondary})`
      }}
    >
      <h4 className={styles.name}>{skin.name}</h4>
      {isUnlocked ? (
        <button 
          className={`${styles.button} ${isActive ? styles.disabled : ''}`}
          onClick={onSet}
          disabled={isActive}
        >
          {isActive ? 'Active' : 'Use'}
        </button>
      ) : (
        <button 
          className={`${styles.button} ${duiktcoins < skinPrice ? styles.disabled : ''}`}
          onClick={onBuy}
          disabled={duiktcoins < skinPrice}
        >
          <span>{skinPrice} Duiktcoins</span>
        </button>
      )}
    </div>
  );
};