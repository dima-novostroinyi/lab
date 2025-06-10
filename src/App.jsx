import React from 'react';
import { Header } from './components/Header/Header';
import { ClickButton } from './components/ClickButton/ClickButton';
import { InfoPanel } from './components/InfoPanel/InfoPanel';
import { AntibonusAlert } from './components/AntibonusAlert/AntibonusAlert';
import { UpgradesSection } from './features/upgrades/UpgradesSection';
import { BonusesSection } from './features/bonuses/BonusesSection';
import { SkinsSection } from './features/skins/SkinsSection';
import { AchievementsSection } from './features/achievements/AchievementsSection';
import { AchievementNotification } from './components/AchievementNotification/AchievementNotification';
import { useGameState } from './hooks/useGameState';
import { useClicker } from './hooks/useClicker';
import { SKINS, ACHIEVEMENTS } from './utils/constants';
import styles from './App.module.scss';

export default function DuiktClicker() {
  const gameState = useGameState();
  const clicker = useClicker(gameState);
  
  const skinColors = SKINS[gameState.currentSkin].colors;
  
  return (
    <div 
      className={styles.gameContainer}
      style={{
        '--primary-color': skinColors.primary,
        '--secondary-color': skinColors.secondary,
        '--accent-color': skinColors.accent
      }}
    >
      <Header 
        credits={gameState.credits}
        duiktcoins={gameState.duiktcoins}
        prestigeCount={gameState.stats.prestigeCount}
        skinColor={skinColors.primary}
      />
      
      {clicker.activeAntibonus && (
        <AntibonusAlert 
          antibonus={clicker.activeAntibonus}
          timer={clicker.antibonusTimer}
        />
      )}
      
      <div className={styles.mainSection}>
        <ClickButton 
          onClick={clicker.handleClick}
          disabled={clicker.activeAntibonus?.type === 'ddos'}
          clickAnimation={clicker.clickAnimation}
          comboCount={clicker.comboCount}
          numberPopups={clicker.numberPopups}
        />
        
        <InfoPanel 
          clickValue={clicker.clickValue}
          autoClickerRate={clicker.autoClickerRate}
          passiveRate={clicker.passiveRate}
          totalClicks={gameState.stats.totalClicks}
        />
      </div>
      
      <UpgradesSection 
        upgrades={gameState.upgrades}
        credits={gameState.credits}
        onBuyUpgrade={clicker.buyUpgrade}
      />
      
      <BonusesSection 
        credits={gameState.credits}
        onOpenCase={clicker.openCase}
        onSpinWheel={clicker.spinWheel}
        onPrestige={clicker.prestige}
      />
      
      <SkinsSection 
        skins={SKINS}
        currentSkin={gameState.currentSkin}
        unlockedSkins={gameState.unlockedSkins}
        duiktcoins={gameState.duiktcoins}
        onBuySkin={clicker.buySkin}
        onSetSkin={gameState.setCurrentSkin}
      />
      
      <AchievementsSection 
        achievements={ACHIEVEMENTS}
        unlockedAchievements={gameState.unlockedAchievements}
      />
      
      {clicker.showAchievement && (
        <AchievementNotification achievement={clicker.showAchievement} />
      )}
    </div>
  );
}