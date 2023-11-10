import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/useAuth';

export default function Layout() {
  const { signOut } = useAuth();

  // signOut();

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',
          },
        }}
        tabBar={() => null}>
        <Tabs.Screen name="index" />
      </Tabs>
    </SafeAreaProvider>
  );
}
