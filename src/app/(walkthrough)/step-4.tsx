import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { StepSphere } from '@/components/StepSphere';
import { CardStack } from '@/layout/CardStack';
import colors from '@/theme/colors';

export default function StepFour() {
  return (
    <View className="w-full flex-1 items-center justify-center">
      <CardStack>
        <View className="flex-1 items-center rounded-3xl bg-white px-4 pb-8 pt-10">
          <Image
            className="h-52 w-52"
            source={require('@/assets/images/Info_state_variants.svg')}
          />
          <View className="mt-2">
            <StepSphere step={4} />
          </View>

          <View className="mt-6 space-y-2">
            <Text className="text-center font-MontserratBold text-xl">
              E pronto! Entre em contato{'\n'}
              com o cliente
            </Text>
            <Text className="font-base text-center font-MontserratMedium">
              Após o pagamento do usuário você terá{'\n'}
              acesso aos seus dados para dar{'\n'}
              sequência no atendimento.
            </Text>
          </View>

          <View className="mt-auto w-full flex-row justify-between">
            <Button className="bg-gray-100" variant="rounded" onPress={() => router.back()}>
              <Feather
                name="arrow-left"
                size={24}
                color={colors.gray[600]}
                backgroundColor="transparent"
              />
            </Button>

            <Button className="w-full max-w-[208px]">
              <Text className="font-MontserratBold text-base text-white">Vamos começar</Text>
            </Button>
          </View>
        </View>
      </CardStack>
    </View>
  );
}
