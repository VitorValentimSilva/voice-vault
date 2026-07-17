import '@/global.css';
import '@/lib/observe';
import '@/lib/sentry';

import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { ObserveRoot } from 'expo-observe';
import { useColorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { RootLayoutNav } from '@/component/root-layout-nav';
import i18n from '@/lib/i18n';

export { ErrorBoundary } from 'expo-router';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(i18n.t('error:clerk.missingPublishableKey'));
}

function RootLayout() {
  const { colorScheme } = useColorScheme();

  const clerkProps = tokenCache
    ? {
        publishableKey,
        tokenCache,
      }
    : {
        publishableKey,
      };

  return (
    <GestureHandlerRootView className={colorScheme === 'dark' ? 'dark flex-1' : 'flex-1'}>
      <ClerkProvider {...clerkProps}>
        <RootLayoutNav />
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}

export default ObserveRoot.wrap(RootLayout);
