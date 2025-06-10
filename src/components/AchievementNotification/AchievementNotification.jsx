import React from 'react';
import styles from './AchievementNotification.module.scss';

export const AchievementNotification = ({ achievement }) => {
  return (
    <div className={styles.notification}>
      <div className={styles.icon}>🏆</div>
      <div className={styles.content}>
        <h3 className={styles.title}>Achievement Unlocked!</h3>
        <p className={styles.description}>
          {achievement.name} - {achievement.description}
        </p>
      </div>
    </div>
  );
};