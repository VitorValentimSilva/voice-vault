import { Tabs } from 'expo-router';
import { House } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import { THEME } from '@/const/theme.const';

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();

  const theme = colorScheme === 'dark' ? THEME.dark : THEME.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 0,
          backgroundColor: theme.card,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.mutedForeground,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => <House color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
