'use client';

import * as React from 'react';
import { RootStore } from './RootStore';

const rootStore = new RootStore();

const RootStoreContext = React.createContext<RootStore | null>(null);

export const RootStoreProvider = ({ children }: React.PropsWithChildren) => (
  <RootStoreContext.Provider value={rootStore}>
    {children}
  </RootStoreContext.Provider>
);

export const useRootStore = (): RootStore => {
  const store = React.useContext(RootStoreContext);
  if (!store) {
    throw new Error('RootStore not in Provider');
  }
  return store;
};

export const useCartStore = () => useRootStore().cartStore;
export const useThemeStore = () => useRootStore().themeStore;

export { rootStore };
