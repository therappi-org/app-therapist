import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export const BackButton = () => {
  return (
    <TouchableOpacity className="android:mr-4" onPress={() => router.back()}>
      <Feather name="arrow-left" size={24} color="#fff" backgroundColor="transparent" />
    </TouchableOpacity>
  );
};
