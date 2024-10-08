import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type BackButtonProps = React.ComponentProps<typeof TouchableOpacity> & {
  iconName?: string;
  iconColor?: string;
};

export const BackButton = ({
  iconName = 'arrow-left',
  iconColor = '#fff',
  ...props
}: BackButtonProps) => {
  return (
    <TouchableOpacity className="android:mr-4" onPress={() => router.back()} {...props}>
      <Feather name={iconName as any} size={24} color={iconColor} backgroundColor="transparent" />
    </TouchableOpacity>
  );
};
