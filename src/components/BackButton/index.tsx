import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type BackButtonProps = {
  iconName?: string;
};

export const BackButton = ({ iconName = 'arrow-left' }: BackButtonProps) => {
  return (
    <TouchableOpacity className="android:mr-4" onPress={() => router.back()}>
      <Feather name={iconName as any} size={24} color="#fff" backgroundColor="transparent" />
    </TouchableOpacity>
  );
};
