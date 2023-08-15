import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
