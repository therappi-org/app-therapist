import '@/styles/global.css';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Slot, useNavigationContainerRef } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { cssInterop } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { InterceptorError } from '@/api/InterceptorError';
import queryClient from '@/api/reactQueryConfig';
import { AuthProvider } from '@/contexts/useAuth';

cssInterop(Image, { className: 'style' });

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Root() {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  useReactQueryDevTools(queryClient);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
      </GestureHandlerRootView>
    </>
  );
}
