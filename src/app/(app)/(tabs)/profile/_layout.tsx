import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '@/components/BackButton';
import colors from '@/theme/colors';

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar style="dark" />
      <View
        style={{
          flex: 1,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}>
        <Stack
          screenOptions={{
            animation: 'slide_from_right',
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: colors.brand.DEFAULT,
            },
            headerTitleStyle: {
              fontFamily: 'Montserrat_600SemiBold',
              fontSize: 18,
            },
            headerLeft: () => <BackButton />,
          }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            options={{
              title: 'Dados cadastrais',
              headerStyle: {
                backgroundColor: colors.gray[100],
              },
              headerTintColor: colors.dark[200],
              headerLeft: () => <BackButton iconColor={colors.dark[200]} />,
            }}
            name="registration-data"
          />
        </Stack>
      </View>
    </>
  );
}
