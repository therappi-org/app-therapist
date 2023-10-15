import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
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
        <Tabs.Screen name="home" />
      </Tabs>
    </SafeAreaProvider>
  );
}
