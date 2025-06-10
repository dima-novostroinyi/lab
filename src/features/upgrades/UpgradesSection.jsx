import React from 'react';
import { UpgradeCard } from './UpgradeCard';
import { UPGRADES } from '../../utils/constants';
import { calculateUpgradePrice } from '../../utils/formulas';
import styles from './Upgrades.module.scss';

export const UpgradesSection = ({ upgrades, credits, onBuyUpgrade }) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Upgrades</h2>
      <div className={styles.grid}>
        {Object.entries(UPGRADES).map(([key, upgrade]) => {
          const level = upgrades[key];
          const price = calculateUpgradePrice(upgrade.basePrice, level);
          const canAfford = credits >= price;
          
          return (
            <UpgradeCard
              key={key}
              upgrade={upgrade}
              level={level}
              price={price}
              canAfford={canAfford}
              onBuy={() => onBuyUpgrade(key)}
            />
          );
        })}
      </div>
    </div>
  );
};