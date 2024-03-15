import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';

export default function Intro() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-brand">
      <View className="my-10 self-center">
        <Image
          className="h-[55px] w-[152px]"
          alt="Logo"
          source={require('../../assets/images/logo-only-text.svg')}
        />
      </View>

      <View
        className="w-full flex-1 items-center rounded-t-xl bg-white"
        style={{
          paddingBottom: insets.bottom,
        }}>
        <View className="flex-1">
          <View className="mb-8 mt-12 items-center space-y-2">
            <Text className="font-MontserratBold text-xl">Vamos começar</Text>
            <Text className="font-MontserratSemiBold text-base">
              Escolha uma das opções de acesso:
            </Text>
          </View>

          <Link href="/sign-in" asChild>
            <Button>
              <Text className="font-MontserratBold text-base text-gray-50">
                Utilizar email cadastrado
              </Text>
            </Button>
          </Link>
        </View>

        <View className="mb-6 w-full items-center space-y-5">
          <Text className="font-MontserratSemiBold text-base">Ainda não tem acesso?</Text>

          <Link href="/(auth)/create-account" asChild>
            <Button variant="outline">
              <Text className=" font-MontserratBold text-base text-brand">Criar minha conta</Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}
