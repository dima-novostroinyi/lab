export const calculateUpgradePrice = (basePrice, level) => {
    return Math.floor(basePrice * Math.pow(1.5, level));
  };
  
  export const calculateClickValue = (clickPower, duiktcoins, isBugActive) => {
    return Math.floor((1 + clickPower) * (1 + duiktcoins * 0.1) * (isBugActive ? 0.5 : 1));
  };
  
  export const calculatePrestigeReward = (credits) => {
    return Math.floor(Math.sqrt(credits / 1000000));
  };