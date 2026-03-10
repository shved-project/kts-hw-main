'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store';

const ThemeInitializer = () => {
  const themeStore = useThemeStore();

  useEffect(() => {
    themeStore.init();
  }, [themeStore]);

  return null;
};

export default ThemeInitializer;
