import React from 'react';
import { AchievementCard } from './AchievementCard';
import styles from './Achievements.module.scss';

export const AchievementsSection = ({ achievements, unlockedAchievements }) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Achievements</h2>
      <div className={styles.grid}>
        {Object.entries(achievements).map(([key, achievement]) => (
          <AchievementCard
            key={key}
            achievement={achievement}
            isUnlocked={unlockedAchievements.includes(achievement.id)}
          />
        ))}
      </div>
    </div>
  );
};