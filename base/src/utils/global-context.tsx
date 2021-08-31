import { createContext } from 'react';
import { globalStore } from '~src/store/global-store';

interface GlobalContextProps {
  globalStore: typeof globalStore;
}

export const GlobalContext = createContext<GlobalContextProps>({} as any);
