import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SplashScreen } from '@/components/SplashScreen';
import { getData } from '@/utils/asyncStoreData';
import { THERAPIST_STORE_WALKTHROUGH_KEY } from '@/utils/constants';

export default function Layout() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const didWalkthrough = await getData(THERAPIST_STORE_WALKTHROUGH_KEY);

        if (didWalkthrough) {
          // router.replace('/(app)/(therapist-register)/phoneNumber');
          router.push('/(app)/(therapist-register)/attendance');
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
      <StatusBar style="light" />
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        className="bg-brand">
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          <Stack.Screen name="intro" />
          <Stack.Screen name="step-1" />
          <Stack.Screen name="step-2" />
          <Stack.Screen name="step-3" />
          <Stack.Screen name="step-4" />
          <Stack.Screen name="step-5" />
        </Stack>
      </View>
    </>
  );
}
