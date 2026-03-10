'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store';
import { observer } from 'mobx-react-lite';

const ToggleTheme = () => {
  const { theme, init, toggle } = useThemeStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <button onClick={toggle} aria-label="Toggle theme">
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};

export default observer(ToggleTheme);
