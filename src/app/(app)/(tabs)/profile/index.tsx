import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View, TouchableOpacity } from 'react-native';

import { useAuth } from '@/contexts/useAuth';
import colors from '@/theme/colors';

export default function Profile() {
  const { userData } = useAuth();

  console.log(userData);

  return (
    <View className="flex-1 bg-gray-100 px-6">
      <View>
        <Text className="font-MontserratBold text-2xl">Olá, {userData?.sName ?? ''}</Text>
        <Text className="font-MontserratBold text-base">Confira as informações da sua conta</Text>
      </View>

      <View className="mt-8">
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row items-center overflow-hidden rounded-2xl bg-white shadow-custom-light">
          <View className="rounded-l-2xl bg-red-500 p-5">
            <Feather name="user-x" size={32} color="white" />
          </View>

          <View className="flex-1 flex-row items-center justify-between p-5">
            <Text className="max-w-[156px] flex-1 font-MontserratSemiBold text-sm">
              Complete seu cadastro para habilitar sua conta
            </Text>
            <Feather name="chevron-right" size={24} color={colors.brand['DEFAULT']} />
          </View>
        </TouchableOpacity>
      </View>

      <View className="mt-6">
        <Text className="font-MontserratBold text-base">Revise seus dados</Text>

        <View className="mt-4">
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/profile/registration-data')}
            activeOpacity={0.8}
            className="flex-row items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gray-50 p-4 shadow-custom-light">
            <View className="rounded-full bg-brand-200/5 p-3">
              <Feather name="user" size={24} color={colors.brand['DEFAULT']} />
            </View>

            <View className="flex-1 flex-row items-center justify-between">
              <Text className="font-MontserratSemiBold text-base">Dados cadastrais</Text>
              <Feather name="chevron-right" size={24} color={colors.brand['DEFAULT']} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
