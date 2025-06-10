import { useState, useEffect, useCallback, useRef } from 'react';

export const useIndexedDB = () => {
  const [isReady, setIsReady] = useState(false);
  const db = useRef(null);

  useEffect(() => {
    const initDB = async () => {
      const request = indexedDB.open('DuiktClickerDB', 1);
      
      request.onupgradeneeded = (event) => {
        const database = event.target.result;
        if (!database.objectStoreNames.contains('gameState')) {
          database.createObjectStore('gameState');
        }
      };
      
      request.onsuccess = (event) => {
        db.current = event.target.result;
        setIsReady(true);
      };
    };
    
    initDB();
  }, []);

  const saveData = useCallback(async (key, value) => {
    if (!db.current) return;
    
    const transaction = db.current.transaction(['gameState'], 'readwrite');
    const store = transaction.objectStore('gameState');
    store.put(value, key);
  }, []);

  const loadData = useCallback(async (key) => {
    if (!db.current) return null;
    
    return new Promise((resolve) => {
      const transaction = db.current.transaction(['gameState'], 'readonly');
      const store = transaction.objectStore('gameState');
      const request = store.get(key);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    });
  }, []);

  return { saveData, loadData, isReady };
};