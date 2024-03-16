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
            name="intro"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="sign-in"
            options={{
              title: 'Utilizar email cadastrado',
            }}
          />
          <Stack.Screen
            name="forgot-password/[email]"
            options={{
              title: 'Esqueci minha senha',
            }}
          />
          <Stack.Screen
            name="forgot-password/feedback"
            options={{
              title: 'Esqueci minha senha',
            }}
          />
          <Stack.Screen
            name="create-account/index"
            options={{
              title: 'Criando seu cadastro',
            }}
          />
          <Stack.Screen
            name="create-account/account-email/[name]"
            options={{
              title: 'Criando seu cadastro',
            }}
          />
          <Stack.Screen
            name="create-account/account-password/[...user]"
            options={{
              title: 'Criando seu cadastro',
            }}
          />
          <Stack.Screen
            name="create-account/feedback"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        </Stack>
      </View>
    </>
  );
}
