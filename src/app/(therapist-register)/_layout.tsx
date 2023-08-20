import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '@/components/BackButton';

const colors = require('@/theme/colors');

export default function Layout() {
  const insets = useSafeAreaInsets();

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
          <Stack.Screen
            options={{
              title: 'Dados pessoais',
            }}
            name="index"
          />
          <Stack.Screen
            options={{
              title: 'Dados pessoais',
            }}
            name="date-birth/[phoneNumber]"
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="photo/index"
          />
          <Stack.Screen
            options={{
              title: 'Adicionar foto',
            }}
            name="photo/takePhoto/index"
          />
        </Stack>
      </View>
    </>
  );
}
