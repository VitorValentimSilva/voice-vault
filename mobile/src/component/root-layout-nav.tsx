import { PortalHost } from '@rn-primitives/portal';
import { Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { PostHogProvider } from 'posthog-react-native';

import SplashScreen from '@/app/splash';
import { useAppBootstrap } from '@/bootstrap/use-app-bootstrap';
import { useNotificationsInit } from '@/bootstrap/use-notifications-init';
import { useRevenueCatInit } from '@/bootstrap/use-revenuecat-init';
import { useScreenTracking } from '@/bootstrap/use-screen-tracking';
import { posthog } from '@/lib/posthog';
import { NAV_THEME } from '@/util/theme';

export function RootLayoutNav() {
  const { colorScheme } = useColorScheme();

  const activeScheme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = NAV_THEME[activeScheme];
  const isReady = useAppBootstrap();

  useRevenueCatInit();
  useNotificationsInit();
  useScreenTracking();

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider value={currentTheme}>
      <PostHogProvider
        autocapture={{
          captureScreens: false,
          captureTouches: false,
        }}
        client={posthog}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

        <PortalHost />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: 'transparent',
            },
          }}>
          <Stack.Screen name="(auth)" />

          <Stack.Screen name="(protected)" />
        </Stack>
      </PostHogProvider>
    </ThemeProvider>
  );
}
