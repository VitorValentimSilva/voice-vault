import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { APP_PREFERENCES_STORAGE_KEY, AppPreferencesState } from '@/const/storage.const';
import { mmkvZustandStorage } from '@/lib/storage';
import { getPersistedPreferences } from '@/util/storage';

const initialPreferences = getPersistedPreferences();

export const useAppPreferencesStore = create<AppPreferencesState>()(
  persist(
    (set) => ({
      languagePreference: initialPreferences.languagePreference,
      themePreference: initialPreferences.themePreference,

      setLanguagePreference: (languagePreference) => set({ languagePreference }),
      setThemePreference: (themePreference) => set({ themePreference }),

      resetLanguagePreference: () => set({ languagePreference: 'system' }),
      resetThemePreference: () => set({ themePreference: 'system' }),
    }),
    {
      name: APP_PREFERENCES_STORAGE_KEY,
      storage: createJSONStorage(() => mmkvZustandStorage),
      version: 1,
      partialize: (state) => ({
        languagePreference: state.languagePreference,
        themePreference: state.themePreference,
      }),
    }
  )
);
