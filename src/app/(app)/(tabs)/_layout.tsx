import { Tabs, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SplashScreen } from '@/components/SplashScreen';
import { getData } from '@/utils/asyncStoreData';
import { THERAPIST_REGISTERED_KEY } from '@/utils/constants';

export default function Layout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const didWalkthrough = await getData(THERAPIST_REGISTERED_KEY);

        if (!didWalkthrough) {
          return router.replace('/(app)/(walkthrough)/intro');
        }

        const didRegister = await getData(THERAPIST_REGISTERED_KEY);

        if (!didRegister) {
          return router.replace('/(app)/(therapist-register)/phoneNumber');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

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
