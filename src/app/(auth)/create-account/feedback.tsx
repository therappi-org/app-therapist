import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardStack } from '@/layout/CardStack';
import colors from '@/theme/colors';

export default function Feedback() {
  return (
    <CardStack>
      <View className="flex-1 px-4 py-6">
        <View className="mt-12 flex-1 items-center justify-center">
          <Image
            className="h-48 w-52"
            alt="Logo"
            source={require('@/assets/images/create-account-feedback.svg')}
          />

          <View className="mt-10 space-y-2">
            <Text className="text-center font-MontserratBold text-xl text-gray-800">
              Maravilha! seu cadastro foi {'\n'} criado com sucesso 🎉
            </Text>
          </View>
        </View>

        <View className="w-full flex-row justify-between">
          <Button className="bg-gray-100" variant="rounded" onPress={() => router.back()}>
            <Feather
              name="arrow-left"
              size={24}
              color={colors.gray[600]}
              backgroundColor="transparent"
            />
          </Button>

          <Button className="w-full max-w-[208px]">
            <Text className="font-MontserratBold text-base text-gray-50">Acessar a Home</Text>
          </Button>
        </View>
      </View>
    </CardStack>
  );
}
