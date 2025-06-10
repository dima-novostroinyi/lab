export const ACHIEVEMENTS = {
  firstClick: {
    id: 'firstClick',
    name: 'First Steps',
    description: 'Make your first click',
    icon: '👶',
    check: (stats) => stats.totalClicks >= 1,
    reward: 100
  },
  hundredClicks: {
    id: 'hundredClicks',
    name: 'Click Novice',
    description: 'Click 100 times',
    icon: '🖱️',
    check: (stats) => stats.totalClicks >= 100,
    reward: 1000
  },
  thousandClicks: {
    id: 'thousandClicks',
    name: 'Click Master',
    description: 'Click 1,000 times',
    icon: '💪',
    check: (stats) => stats.totalClicks >= 1000,
    reward: 10000
  },
  firstMillion: {
    id: 'firstMillion',
    name: 'Millionaire',
    description: 'Earn 1,000,000 credits total',
    icon: '💰',
    check: (stats) => stats.totalEarned >= 1000000,
    reward: 50000
  },
  firstPrestige: {
    id: 'firstPrestige',
    name: 'Prestige Pioneer',
    description: 'Perform your first prestige',
    icon: '⭐',
    check: (stats) => stats.prestigeCount >= 1,
    reward: 1
  },
  prestigeMaster: {
    id: 'prestigeMaster',
    name: 'Prestige Master',
    description: 'Prestige 10 times',
    icon: '🌟',
    check: (stats) => stats.prestigeCount >= 10,
    reward: 5
  },
  comboKing: {
    id: 'comboKing',
    name: 'Combo King',
    description: 'Reach 10x combo',
    icon: '🔥',
    check: (stats) => stats.maxCombo >= 10,
    reward: 25000
  },
  luckyDevil: {
    id: 'luckyDevil',
    name: 'Lucky Devil',
    description: 'Get 50 lucky clicks',
    icon: '🍀',
    check: (stats) => stats.luckyClicks >= 50,
    reward: 100000
  },
  skinCollector: {
    id: 'skinCollector',
    name: 'Fashion Icon',
    description: 'Unlock all skins',
    icon: '🎨',
    check: (stats) => stats.unlockedSkins >= 5,
    reward: 3
  },
  survivor: {
    id: 'survivor',
    name: 'Survivor',
    description: 'Survive 20 antibonuses',
    icon: '🛡️',
    check: (stats) => stats.antibonusesSurvived >= 20,
    reward: 75000
  },
  upgradeAddict: {
    id: 'upgradeAddict',
    name: 'Upgrade Addict',
    description: 'Buy 50 upgrades total',
    icon: '📈',
    check: (stats) => stats.totalUpgrades >= 50,
    reward: 50000
  },
  gamblingProblem: {
    id: 'gamblingProblem',
    name: 'High Roller',
    description: 'Open 20 cases or spin wheel 20 times',
    icon: '🎰',
    check: (stats) => (stats.casesOpened + stats.wheelSpins) >= 20,
    reward: 100000
  }
};

export const UPGRADES = {
  clickPower: {
    name: 'Click Power',
    basePrice: 10,
    effect: 1,
    description: 'Increases credits per click',
    icon: '👆'
  },
  autoClicker: {
    name: 'Auto Clicker',
    basePrice: 50,
    effect: 0.5,
    description: 'Automatic clicks per second',
    icon: '🤖'
  },
  passiveIncome: {
    name: 'Passive Income',
    basePrice: 100,
    effect: 2,
    description: 'Credits per second',
    icon: '💰'
  },
  combo: {
    name: 'Combo Multiplier',
    basePrice: 200,
    effect: 0.1,
    description: 'Bonus for consecutive clicks',
    icon: '🔥'
  },
  luck: {
    name: 'Lucky Clicks',
    basePrice: 500,
    effect: 0.05,
    description: 'Chance for 10x credits',
    icon: '🍀'
  }
};

export const SKINS = {
  default: { name: 'Classic', colors: { primary: '#3498db', secondary: '#2c3e50', accent: '#e74c3c' } },
  neon: { name: 'Neon', colors: { primary: '#ff006e', secondary: '#8338ec', accent: '#3a86ff' } },
  nature: { name: 'Nature', colors: { primary: '#2d6a4f', secondary: '#1b5e3f', accent: '#95d5b2' } },
  sunset: { name: 'Sunset', colors: { primary: '#f77f00', secondary: '#d62828', accent: '#fcbf49' } },
  cyber: { name: 'Cyber', colors: { primary: '#00d9ff', secondary: '#7209b7', accent: '#f72585' } }
};

export const ANTIBONUS_TYPES = {
  virus: { name: 'Virus', duration: 10000, effect: 'Disables auto-clicker', icon: '🦠' },
  bug: { name: 'Bug', duration: 15000, effect: 'Reduces click value by 50%', icon: '🐛' },
  ddos: { name: 'DDoS Attack', duration: 20000, effect: 'Blocks all income', icon: '🔴' }
};