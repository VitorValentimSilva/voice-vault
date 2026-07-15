import { useAuth } from '@clerk/expo';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';

import { applyLanguagePreference } from '@/lib/i18n';
import Logger from '@/lib/logger';
import { useAppPreferencesStore } from '@/storage/use-app-preferences-store';

export function useAppBootstrap() {
  const { isLoaded: isAuthLoaded } = useAuth();

  const [preferencesReady, setPreferencesReady] = useState(false);

  const languagePreference = useAppPreferencesStore((state) => state.languagePreference);
  const themePreference = useAppPreferencesStore((state) => state.themePreference);
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function bootstrap() {
      try {
        await applyLanguagePreference(languagePreference);

        colorScheme.setColorScheme(themePreference);
      } catch (error) {
        Logger.exception({
          message: 'Failed to bootstrap application preferences.',
          error,
          tags: {
            feature: 'bootstrap',
            action: 'preferences',
          },
          extra: {
            languagePreference,
            themePreference,
          },
        });
      } finally {
        setPreferencesReady(true);
      }
    }

    void bootstrap();
  }, [languagePreference, themePreference, colorScheme]);

  return preferencesReady && isAuthLoaded;
}
