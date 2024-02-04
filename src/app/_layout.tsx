import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { Slot, useNavigationContainerRef } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { InterceptorError } from '@/api/InterceptorError';
import queryClient from '@/api/reactQueryConfig';
import { AuthProvider } from '@/contexts/useAuth';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Root() {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  useReactQueryDevTools(queryClient);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootSiblingParent>
            <InterceptorError />
            <AuthProvider>
              <Slot />
            </AuthProvider>
          </RootSiblingParent>
        </QueryClientProvider>
      </SafeAreaProvider>
    </>
  );
}
