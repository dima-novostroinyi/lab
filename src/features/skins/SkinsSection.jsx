import React from 'react';
import { SkinCard } from './SkinCard';
import styles from './Skins.module.scss';

export const SkinsSection = ({ 
  skins, 
  currentSkin, 
  unlockedSkins, 
  duiktcoins, 
  onBuySkin, 
  onSetSkin 
}) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Skins Shop</h2>
      <div className={styles.grid}>
        {Object.entries(skins).map(([key, skin]) => (
          <SkinCard
            key={key}
            skinKey={key}
            skin={skin}
            isUnlocked={unlockedSkins.includes(key)}
            isActive={currentSkin === key}
            duiktcoins={duiktcoins}
            onBuy={() => onBuySkin(key)}
            onSet={() => onSetSkin(key)}
          />
        ))}
      </div>
    </div>
  );
};