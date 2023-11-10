import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';

type CardContentProps = {
  title?: string;
  subtitle?: string;
  image?: string;
};

export const CardContent = ({ title, subtitle, image }: CardContentProps) => {
  return (
    <View className="flex-row items-center">
      {image && <Image className="h-14 w-14" source={image} />}
      <View className="flex flex-col gap-1">
        {title && <Text className="font-MontserratBold text-sm text-brand-100">{title}</Text>}
        {subtitle && (
          <Text className="font-MontserratSemiBold text-sm text-gray-600 ">{subtitle}</Text>
        )}
      </View>
    </View>
  );
};
