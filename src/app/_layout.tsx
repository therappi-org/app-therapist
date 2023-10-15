import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from '@expo-google-fonts/montserrat';
import { QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen as ExpoSplashScreen, Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import queryClient from '@/api/reactQueryConfig';
import { SplashScreen } from '@/components/SplashScreen';
import { AuthProvider } from '@/contexts/useAuth';

ExpoSplashScreen.preventAutoHideAsync();

export default function Root() {
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

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </>
  );
}
