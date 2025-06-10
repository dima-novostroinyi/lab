import React from 'react';
import { BonusButton } from './BonusButton';
import styles from './Bonuses.module.scss';

export const BonusesSection = ({ credits, onOpenCase, onSpinWheel, onPrestige }) => {
  const bonuses = [
    {
      id: 'case',
      name: 'Open Case',
      icon: '📦',
      price: 5000,
      currency: 'credits',
      onClick: onOpenCase,
      disabled: credits < 5000
    },
    {
      id: 'wheel',
      name: 'Wheel of Fortune',
      icon: '🎰',
      price: 10000,
      currency: 'credits',
      onClick: onSpinWheel,
      disabled: credits < 10000
    },
    {
      id: 'prestige',
      name: 'Prestige',
      icon: '⭐',
      price: 1000000,
      currency: 'credits',
      onClick: onPrestige,
      disabled: credits < 1000000,
      special: true
    }
  ];

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Bonuses & Features</h2>
      <div className={styles.grid}>
        {bonuses.map(bonus => (
          <BonusButton key={bonus.id} {...bonus} />
        ))}
      </div>
    </div>
  );
};