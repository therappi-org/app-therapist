'expo-router';
import Checkbox from 'expo-checkbox';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { ProgressBar } from '@/components/ProgressBar';

export default function Bio() {
  const [isChecked, setChecked] = useState(false);

  return (
    <View className="flex-1 bg-brand">
      <View className="mt-4 space-y-4 px-6">
        <ProgressBar progress={40} />
        <Text className="font-MontserratSemiBold text-base text-white">Habilitar serviços</Text>
      </View>

      <View className="mt-8 flex-1 px-6">
        <Text className="font-MontserratBold text-base text-white">
          Marque as terapias que você quer ativar na plataforma:
        </Text>

        <View className="mt-8 space-y-2">
          <View className="flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
            <View className="flex-row items-center">
              <Image
                className="h-14 w-14"
                source={require('@/assets/images/therapy-example.svg')}
              />
              <Text className="font-MontserratBold text-sm text-brand-100">Psicologia</Text>
            </View>
            <Checkbox
              value={isChecked}
              className="h-4 w-4 rounded-full"
              onValueChange={setChecked}
            />
          </View>
          <View className="flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
            <View className="flex-row items-center">
              <Image
                className="h-14 w-14"
                source={require('@/assets/images/therapy-example.svg')}
              />
              <Text className="font-MontserratBold text-sm text-brand-100">Psicologia</Text>
            </View>
            <Checkbox
              value={isChecked}
              className="h-4 w-4 rounded-full"
              onValueChange={setChecked}
            />
          </View>
          <View className="flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
            <View className="flex-row items-center">
              <Image
                className="h-14 w-14"
                source={require('@/assets/images/therapy-example.svg')}
              />
              <Text className="font-MontserratBold text-sm text-brand-100">Psicologia</Text>
            </View>
            <Checkbox
              value={isChecked}
              className="h-4 w-4 rounded-full"
              onValueChange={setChecked}
            />
          </View>
          <View className="flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
            <View className="flex-row items-center">
              <Image
                className="h-14 w-14"
                source={require('@/assets/images/therapy-example.svg')}
              />
              <Text className="font-MontserratBold text-sm text-brand-100">Psicologia</Text>
            </View>
            <Checkbox
              value={isChecked}
              className="h-4 w-4 rounded-full"
              onValueChange={setChecked}
            />
          </View>
          <View className="flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
            <View className="flex-row items-center">
              <Image
                className="h-14 w-14"
                source={require('@/assets/images/therapy-example.svg')}
              />
              <Text className="font-MontserratBold text-sm text-brand-100">Psicologia</Text>
            </View>
            <Checkbox
              value={isChecked}
              className="h-4 w-4 rounded-full"
              onValueChange={setChecked}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
