import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardStack } from '@/layout/CardStack';

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

          <View className="mt-10 gap-2">
            <Text className="text-center font-MontserratBold text-xl text-gray-800">
              Maravilha! seu cadastro foi {'\n'} criado com sucesso 🎉
            </Text>
          </View>
        </View>

        <View className="w-full flex-row justify-between">
          <Link asChild replace href="/(auth)/sign-in">
            <Button className="w-full">
              <Text className="font-MontserratBold text-base text-gray-50">Acessar Conta</Text>
            </Button>
          </Link>
        </View>
      </View>
    </CardStack>
  );
}

Feedback.navigationOptions = {
  gestureEnabled: false,
};
