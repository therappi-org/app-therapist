import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Intro() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-brand">
      <View className="my-10 self-center">
        <Image
          className="h-28 w-44"
          alt="Logo"
          source={require('../../assets/images/logo-only-text.svg')}
        />
      </View>

      <View
        className="w-full flex-1 items-center rounded-xl bg-white"
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
            <TouchableOpacity
              activeOpacity={0.8}
              className="w-80 max-w-full items-center justify-center rounded-full bg-brand py-4">
              <Text className="font-MontserratBold text-base text-gray-50">
                Utilizar email cadastrado
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View className="mb-6 w-full items-center space-y-5">
          <Text className="font-MontserratSemiBold text-base">Ainda não tem acesso?</Text>

          <TouchableOpacity
            activeOpacity={0.6}
            className="w-80 max-w-full items-center justify-center rounded-full border border-brand py-4">
            <Text className=" font-MontserratBold text-base text-brand">Criar minha conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
