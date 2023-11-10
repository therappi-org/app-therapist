import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from '@expo-google-fonts/montserrat';
import { Redirect, SplashScreen as ExpoSplashScreen, Slot } from 'expo-router';
import { useEffect, useState } from 'react';

import { SplashScreen } from '@/components/SplashScreen';
import { useAuth } from '@/contexts/useAuth';

export default function AppLayout() {
  const { isAuthLoading, isAuthenticated } = useAuth();

  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      if (fontsLoaded) {
        ExpoSplashScreen.hideAsync();
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsReady(fontsLoaded);
      }
    })();
  }, [fontsLoaded]);

  if (!isReady || isAuthLoading) {
    return <SplashScreen />;
  }

  // if (!isAuthenticated) {
  //   return <Redirect href="/(auth)/intro" />;
  //   // return <Redirect href="/(app)/(walkthrough)/intro" />;
  // }

  return <Slot />;
}
