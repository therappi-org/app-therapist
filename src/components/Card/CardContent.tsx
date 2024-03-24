import { Image, ImageProps } from 'expo-image';
import React from 'react';
import { Text, View, ViewProps } from 'react-native';

import { cn } from '@/utils/lib';
interface CardContentProps extends ViewProps {
  title?: string;
  subtitle?: string;
  image?: ImageProps;
}

export const CardContent = ({ title, subtitle, image, className, ...props }: CardContentProps) => {
  return (
    <View className={cn('flex-1 flex-row items-center gap-2', className)} {...props}>
      {image && <Image {...image} className={cn('h-9 w-9', image.className)} />}
      <View className="flex-1">
        {title && (
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="leading-2 font-MontserratBold text-base text-brand-100">
            {title}
          </Text>
        )}
        {subtitle && (
          <Text className="font-MontserratSemiBold text-sm text-gray-600">{subtitle}</Text>
        )}
      </View>
    </View>
  );
};
