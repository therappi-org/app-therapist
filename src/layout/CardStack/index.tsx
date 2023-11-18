import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CardStack = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="relative w-full flex-1 items-center justify-center bg-brand px-4"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      <View className="flex-1 items-center justify-center">
        <View className="absolute z-30 h-[90%] w-full rounded-3xl bg-white shadow">{children}</View>
        <View className="absolute bottom-7 z-20 h-[50%] w-[95%] rounded-3xl bg-white shadow" />
        <View className="absolute bottom-5 z-10 h-[50%] w-[90%] rounded-3xl bg-white shadow" />
      </View>
    </View>
  );
};
