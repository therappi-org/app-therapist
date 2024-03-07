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
    <View className={cn('flex-1 flex-row items-center gap-1', className)} {...props}>
      {image && <Image {...image} className={cn('h-14 w-14', image.className)} />}
      <View className="flex flex-1 flex-col gap-1">
        {title && <Text className="font-MontserratBold text-sm text-brand-100">{title}</Text>}
        {subtitle && (
          <Text className="font-MontserratSemiBold text-sm text-gray-600">{subtitle}</Text>
        )}
      </View>
    </View>
  );
};
