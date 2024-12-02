"use client";

import { createContext, useContext, useEffect, useState } from "react";

type LocalStorageContextType = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

const LocalStorageContext = createContext<LocalStorageContextType | null>(null);

export function LocalStorageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getItem = (key: string) => {
    if (!isClient) return null;
    return localStorage.getItem(key);
  };

  const setItem = (key: string, value: string) => {
    if (!isClient) return;
    localStorage.setItem(key, value);
  };

  const removeItem = (key: string) => {
    if (!isClient) return;
    localStorage.removeItem(key);
  };

  return (
    <LocalStorageContext.Provider value={{ getItem, setItem, removeItem }}>
      {children}
    </LocalStorageContext.Provider>
  );
}

export function useLocalStorage() {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error(
      "useLocalStorage must be used within a LocalStorageProvider"
    );
  }
  return context;
}
