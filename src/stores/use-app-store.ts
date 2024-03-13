import { create } from 'zustand';

type AppStoreState = {
  isLogged: boolean;
  isRegistered: boolean;
};
type AppStoreAction = {
  setIsLogged: (isLogged: boolean) => void;
  setIsRegistered: (isRegistered: boolean) => void;
};

export const useAppStore = create<AppStoreState & AppStoreAction>((set) => ({
  isLogged: false,
  isRegistered: false,
  setIsLogged: (isLogged: boolean) => set({ isLogged }),
  setIsRegistered: (isRegistered: boolean) => set({ isRegistered }),
}));
