import { Redirect, Stack } from 'expo-router';

import { SplashScreen } from '@/components/SplashScreen';
import { useAuth } from '@/contexts/useAuth';

export default function AppLayout() {
  const { isAuthLoading, isAuthenticated } = useAuth();

  if (isAuthLoading) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/intro" />;
  }

  return <Stack />;
}
