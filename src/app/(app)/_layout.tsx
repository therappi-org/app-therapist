import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from '@expo-google-fonts/montserrat';
import { Redirect, Slot } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { SplashScreen } from '@/components/SplashScreen';
import { useAuth } from '@/contexts/useAuth';

export default function AppLayout() {
  const { isAuthLoading, isAuthenticated } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    (async () => {
      if (fontsLoaded) {
        await ExpoSplashScreen.hideAsync();
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsReady(fontsLoaded);
      }
    })();
  }, [fontsLoaded]);

  if (!isReady || isAuthLoading) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/intro" />;
  }

  return <Slot />;
}
