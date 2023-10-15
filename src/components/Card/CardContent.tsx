import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';

type CardContentProps = {
  title?: string;
  image?: string;
};

export const CardContent = ({ title, image }: CardContentProps) => {
  return (
    <View className="flex-row items-center">
      {image && <Image className="h-14 w-14" source={image} />}
      {title && <Text className="font-MontserratBold text-sm text-brand-100">{title}</Text>}
    </View>
  );
};
