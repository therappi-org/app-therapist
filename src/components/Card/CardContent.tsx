import clsx from 'clsx';
import { Image, ImageProps } from 'expo-image';
import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

type CardContentProps = {
  title?: string;
  subtitle?: string;
  image?: ImageProps;
  style?: StyleProp<ViewStyle>;
};

export const CardContent = ({ title, subtitle, image, style }: CardContentProps) => {
  return (
    <View className="flex-row items-center gap-2" style={style}>
      {image && <Image className="h-14 w-14" {...image} />}
      <View className="flex flex-col gap-1">
        {title && <Text className="font-MontserratBold text-sm text-brand-100">{title}</Text>}
        {subtitle && (
          <Text className="font-MontserratSemiBold text-sm text-gray-600 ">{subtitle}</Text>
        )}
      </View>
    </View>
  );
};
