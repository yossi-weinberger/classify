"use client";
import React, { useState, createContext, useContext } from 'react';

const SortContext = createContext();

export function useSortContext() {
  return useContext(SortContext);
}

export default function SortProvider({ children }) {
  const [sortBy, setSortBy] = useState(0);

  const sortItems = (items, key) => {
    const collator = new Intl.Collator('he', { sensitivity: 'base' });
    return [...items].sort((a, b) => {
      const aValue = a[key] || '';
      const bValue = b[key] || '';
      return sortBy === 0
        ? collator.compare(aValue, bValue)
        : collator.compare(bValue, aValue);
    });
  };

  return (
    <SortContext.Provider value={{ sortBy, setSortBy, sortItems }}>
      {children}
    </SortContext.Provider>
  );
}