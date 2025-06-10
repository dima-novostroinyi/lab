import { useState, useEffect } from 'react';
import { useIndexedDB } from './useIndexedDB';

export const useGameState = () => {
  const [credits, setCredits] = useState(0);
  const [duiktcoins, setDuiktcoins] = useState(0);
  const [upgrades, setUpgrades] = useState({
    clickPower: 0,
    autoClicker: 0,
    passiveIncome: 0,
    combo: 0,
    luck: 0
  });
  const [currentSkin, setCurrentSkin] = useState('default');
  const [unlockedSkins, setUnlockedSkins] = useState(['default']);
  const [totalClicks, setTotalClicks] = useState(0);
  const [prestigeCount, setPrestigeCount] = useState(0);
  
  const [stats, setStats] = useState({
    totalClicks: 0,
    totalEarned: 0,
    prestigeCount: 0,
    maxCombo: 0,
    luckyClicks: 0,
    unlockedSkins: 1,
    antibonusesSurvived: 0,
    totalUpgrades: 0,
    casesOpened: 0,
    wheelSpins: 0
  });
  
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  
  const { saveData, loadData, isReady } = useIndexedDB();

  // Load game state
  useEffect(() => {
    if (!isReady) return;
    
    const loadGameState = async () => {
      const savedState = await loadData('gameState');
      if (savedState) {
        setCredits(savedState.credits || 0);
        setDuiktcoins(savedState.duiktcoins || 0);
        setUpgrades(savedState.upgrades || upgrades);
        setCurrentSkin(savedState.currentSkin || 'default');
        setUnlockedSkins(savedState.unlockedSkins || ['default']);
        setTotalClicks(savedState.totalClicks || 0);
        setPrestigeCount(savedState.prestigeCount || 0);
        setStats(savedState.stats || stats);
        setUnlockedAchievements(savedState.unlockedAchievements || []);
      }
    };
    
    loadGameState();
  }, [isReady]);

  // Save game state
  useEffect(() => {
    if (!isReady) return;
    
    const gameState = {
      credits,
      duiktcoins,
      upgrades,
      currentSkin,
      unlockedSkins,
      totalClicks,
      prestigeCount,
      stats,
      unlockedAchievements
    };
    
    saveData('gameState', gameState);
  }, [credits, duiktcoins, upgrades, currentSkin, unlockedSkins, totalClicks, prestigeCount, stats, unlockedAchievements]);

  const updateStats = (updates) => {
    setStats(prev => ({ ...prev, ...updates }));
  };

  return {
    credits,
    setCredits,
    duiktcoins,
    setDuiktcoins,
    upgrades,
    setUpgrades,
    currentSkin,
    setCurrentSkin,
    unlockedSkins,
    setUnlockedSkins,
    totalClicks,
    setTotalClicks,
    prestigeCount,
    setPrestigeCount,
    stats,
    updateStats,
    unlockedAchievements,
    setUnlockedAchievements
  };
};