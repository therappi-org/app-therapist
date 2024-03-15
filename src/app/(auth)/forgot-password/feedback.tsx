import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';

export default function Feedback() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-white px-4"
      style={{
        paddingBottom: insets.bottom,
      }}>
      <View className="flex-1 items-center justify-center">
        <Image
          className="h-52 w-52"
          contentFit="cover"
          alt="feedback de recuperação de senha"
          source={require('@/assets/images/forgot-password-feedback.svg')}
        />

        <View className="items-center space-y-3">
          <Text className="font-MontserratBold text-xl text-gray-600">
            Enviamos sua senha de acesso
          </Text>
          <Text className="text-center font-MontserratSemiBold text-base text-gray-600">
            Acesse seu email cadastrado para{'\n'} recuperá-la e poder acessar novamente sua conta,
            ok?
          </Text>
        </View>
      </View>

      <View className="mb-4 items-center">
        <Link href="/(auth)/sign-in" asChild>
          <Button>
            <Text className={`font-MontserratBold text-base  ${'text-gray-50'}`}>Ok, entendi</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}
