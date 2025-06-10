import { useState, useEffect } from 'react';
import { UPGRADES, ANTIBONUS_TYPES, ACHIEVEMENTS } from '../utils/constants';
import { calculateClickValue, calculateUpgradePrice, calculatePrestigeReward } from '../utils/formulas';

export const useClicker = (gameState) => {
  const [comboCount, setComboCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [activeAntibonus, setActiveAntibonus] = useState(null);
  const [antibonusTimer, setAntibonusTimer] = useState(0);
  const [clickAnimation, setClickAnimation] = useState(false);
  const [numberPopups, setNumberPopups] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);

  const clickValue = calculateClickValue(
    gameState.upgrades.clickPower,
    gameState.duiktcoins,
    activeAntibonus?.type === 'bug'
  );
  
  const autoClickerRate = gameState.upgrades.autoClicker * 0.5;
  const passiveRate = gameState.upgrades.passiveIncome * 2;

  // Check achievements
  const checkAchievements = () => {
    Object.entries(ACHIEVEMENTS).forEach(([key, achievement]) => {
      if (!gameState.unlockedAchievements.includes(achievement.id) && achievement.check(gameState.stats)) {
        gameState.setUnlockedAchievements(prev => [...prev, achievement.id]);
        
        if (achievement.id === 'firstPrestige' || achievement.id === 'prestigeMaster' || achievement.id === 'skinCollector') {
          gameState.setDuiktcoins(prev => prev + achievement.reward);
        } else {
          gameState.setCredits(prev => prev + achievement.reward);
        }
        
        setShowAchievement(achievement);
        setTimeout(() => setShowAchievement(null), 5000);
      }
    });
  };

  useEffect(() => {
    checkAchievements();
  }, [gameState.stats]);

  // Auto clicker effect
  useEffect(() => {
    if (autoClickerRate === 0 || activeAntibonus?.type === 'virus') return;
    
    const interval = setInterval(() => {
      if (activeAntibonus?.type !== 'ddos') {
        gameState.setCredits(prev => prev + clickValue);
        gameState.updateStats({ totalEarned: gameState.stats.totalEarned + clickValue });
      }
    }, 1000 / autoClickerRate);
    
    return () => clearInterval(interval);
  }, [autoClickerRate, clickValue, activeAntibonus]);

  // Passive income effect
  useEffect(() => {
    if (passiveRate === 0) return;
    
    const interval = setInterval(() => {
      if (activeAntibonus?.type !== 'ddos') {
        gameState.setCredits(prev => prev + passiveRate);
        gameState.updateStats({ totalEarned: gameState.stats.totalEarned + passiveRate });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [passiveRate, activeAntibonus]);

  // Antibonus timer
  useEffect(() => {
    if (!activeAntibonus) return;
    
    const interval = setInterval(() => {
      setAntibonusTimer(prev => {
        if (prev <= 100) {
          setActiveAntibonus(null);
          gameState.updateStats({ antibonusesSurvived: gameState.stats.antibonusesSurvived + 1 });
          return 0;
        }
        return prev - 100;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [activeAntibonus]);

  const showNumberPopup = (amount, isLucky) => {
    const id = Date.now();
    setNumberPopups(prev => [...prev, { id, amount, isLucky }]);
    setTimeout(() => {
      setNumberPopups(prev => prev.filter(p => p.id !== id));
    }, 1000);
  };

  const triggerAntibonus = () => {
    const types = Object.keys(ANTIBONUS_TYPES);
    const randomType = types[Math.floor(Math.random() * types.length)];
    const antibonus = ANTIBONUS_TYPES[randomType];
    
    setActiveAntibonus({ type: randomType, ...antibonus });
    setAntibonusTimer(antibonus.duration);
  };

  const handleClick = () => {
    if (activeAntibonus?.type === 'ddos') return;
    
    setClickAnimation(true);
    setTimeout(() => setClickAnimation(false), 100);
    
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime;
    
    if (timeSinceLastClick < 1000 && gameState.upgrades.combo > 0) {
      setComboCount(prev => {
        const newCombo = Math.min(prev + 1, 10);
        gameState.updateStats({ maxCombo: Math.max(gameState.stats.maxCombo, newCombo) });
        return newCombo;
      });
    } else {
      setComboCount(0);
    }
    
    setLastClickTime(now);
    gameState.setTotalClicks(prev => prev + 1);
    gameState.updateStats({ totalClicks: gameState.stats.totalClicks + 1 });
    
    let earnedCredits = clickValue * (1 + comboCount * gameState.upgrades.combo * 0.1);
    
    if (Math.random() < gameState.upgrades.luck * 0.05) {
      earnedCredits *= 10;
      showNumberPopup(earnedCredits, true);
      gameState.updateStats({ luckyClicks: gameState.stats.luckyClicks + 1 });
    } else {
      showNumberPopup(earnedCredits, false);
    }
    
    gameState.setCredits(prev => prev + Math.floor(earnedCredits));
    gameState.updateStats({ totalEarned: gameState.stats.totalEarned + Math.floor(earnedCredits) });
    
    if (Math.random() < 0.02 && !activeAntibonus) {
      triggerAntibonus();
    }
  };

  const buyUpgrade = (type) => {
    const upgrade = UPGRADES[type];
    const currentLevel = gameState.upgrades[type];
    const price = calculateUpgradePrice(upgrade.basePrice, currentLevel);
    
    if (gameState.credits >= price) {
      gameState.setCredits(prev => prev - price);
      gameState.setUpgrades(prev => ({ ...prev, [type]: prev[type] + 1 }));
      gameState.updateStats({ totalUpgrades: gameState.stats.totalUpgrades + 1 });
    }
  };

  const prestige = () => {
    if (gameState.credits < 1000000) return;
    
    const duiktcoinsEarned = calculatePrestigeReward(gameState.credits);
    
    gameState.setDuiktcoins(prev => prev + duiktcoinsEarned);
    gameState.setCredits(0);
    gameState.setUpgrades({
      clickPower: 0,
      autoClicker: 0,
      passiveIncome: 0,
      combo: 0,
      luck: 0
    });
    setComboCount(0);
    gameState.setPrestigeCount(prev => prev + 1);
    gameState.updateStats({ prestigeCount: gameState.stats.prestigeCount + 1 });
    
    alert(`Prestige complete! You earned ${duiktcoinsEarned} Duiktcoins!`);
  };

  const buySkin = (skinKey) => {
    const skinPrice = 10;
    
    if (gameState.duiktcoins >= skinPrice && !gameState.unlockedSkins.includes(skinKey)) {
      gameState.setDuiktcoins(prev => prev - skinPrice);
      gameState.setUnlockedSkins(prev => [...prev, skinKey]);
      gameState.setCurrentSkin(skinKey);
      gameState.updateStats({ unlockedSkins: gameState.stats.unlockedSkins + 1 });
    }
  };

  const spinWheel = () => {
    if (gameState.credits < 10000) return;
    
    gameState.setCredits(prev => prev - 10000);
    gameState.updateStats({ wheelSpins: gameState.stats.wheelSpins + 1 });
    
    const prizes = [
      { type: 'credits', amount: 50000, name: '50,000 Credits' },
      { type: 'credits', amount: 100000, name: '100,000 Credits' },
      { type: 'duiktcoins', amount: 1, name: '1 Duiktcoin' },
      { type: 'nothing', amount: 0, name: 'Better luck next time!' }
    ];
    
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    
    if (prize.type === 'credits') {
      gameState.setCredits(prev => prev + prize.amount);
      gameState.updateStats({ totalEarned: gameState.stats.totalEarned + prize.amount });
    } else if (prize.type === 'duiktcoins') {
      gameState.setDuiktcoins(prev => prev + prize.amount);
    }
    
    alert(`You won: ${prize.name}`);
  };

  const openCase = () => {
    if (gameState.credits < 5000) return;
    
    gameState.setCredits(prev => prev - 5000);
    gameState.updateStats({ casesOpened: gameState.stats.casesOpened + 1 });
    
    const rewards = [
      { type: 'credits', amount: 2500, chance: 0.5 },
      { type: 'credits', amount: 10000, chance: 0.3 },
      { type: 'credits', amount: 25000, chance: 0.15 },
      { type: 'duiktcoins', amount: 1, chance: 0.05 }
    ];
    
    const random = Math.random();
    let cumulative = 0;
    
    for (const reward of rewards) {
      cumulative += reward.chance;
      if (random < cumulative) {
        if (reward.type === 'credits') {
          gameState.setCredits(prev => prev + reward.amount);
          gameState.updateStats({ totalEarned: gameState.stats.totalEarned + reward.amount });
          alert(`You won ${reward.amount} credits!`);
        } else {
          gameState.setDuiktcoins(prev => prev + reward.amount);
          alert(`You won ${reward.amount} Duiktcoins!`);
        }
        break;
      }
    }
  };

  return {
    clickValue,
    autoClickerRate,
    passiveRate,
    comboCount,
    activeAntibonus,
    antibonusTimer,
    clickAnimation,
    numberPopups,
    showAchievement,
    handleClick,
    buyUpgrade,
    prestige,
    buySkin,
    spinWheel,
    openCase
  };
};