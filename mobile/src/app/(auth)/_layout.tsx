import { useAuth } from '@clerk/expo';
import { Redirect, Stack } from 'expo-router';

import SplashScreen from '@/app/splash';

export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <SplashScreen />;
  }

  if (isSignedIn) {
    return <Redirect href="/(protected)/(tabs)/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <Stack.Screen name="sign-in" />

      <Stack.Screen name="sign-up" />

      <Stack.Screen name="verify-email" />

      <Stack.Screen name="forgot-password" />

      <Stack.Screen name="reset-password" />
    </Stack>
  );
}
