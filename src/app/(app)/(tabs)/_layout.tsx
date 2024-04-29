import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SplashScreen } from '@/components/SplashScreen';
import { getData } from '@/utils/asyncStoreData';
import { THERAPIST_REGISTERED_KEY } from '@/utils/constants';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

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
    <>
      <StatusBar style="dark" />
      <View
        className="flex-1 bg-gray-100"
        style={{
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'blue',
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
            }}
          />
        </Tabs>
      </View>
    </>
  );
}
