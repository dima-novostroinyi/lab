import React from 'react';
import styles from './Achievements.module.scss';

export const AchievementCard = ({ achievement, isUnlocked }) => {
  const isPrestigeReward = ['firstPrestige', 'prestigeMaster', 'skinCollector'].includes(achievement.id);
  
  return (
    <div className={`${styles.card} ${isUnlocked ? styles.unlocked : ''}`}>
      <div className={styles.icon}>{achievement.icon}</div>
      <div className={styles.info}>
        <h4 className={styles.name}>{achievement.name}</h4>
        <p className={styles.description}>{achievement.description}</p>
        {isUnlocked && (
          <div className={styles.reward}>
            ✓ Reward: {achievement.reward} {isPrestigeReward ? 'Duiktcoins' : 'Credits'}
          </div>
        )}
      </div>
    </div>
  );
};