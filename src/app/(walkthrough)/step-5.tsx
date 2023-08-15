import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { StepSphere } from '@/components/StepSphere';
import { CardStack } from '@/layout/CardStack';
import colors from '@/theme/colors';

export default function StepFive() {
  return (
    <View className="w-full flex-1 items-center justify-center">
      <CardStack>
        <View className="flex-1 items-center justify-center rounded-3xl bg-white px-4 pb-8 pt-14">
          <View className="flex-1 items-center justify-center">
            <Image
              className="h-52 w-52"
              source={require('@/assets/images/Info_state_variants.svg')}
            />
            <View className="mt-2">
              <StepSphere step={5} />
            </View>

            <View className="mt-6 space-y-2">
              <Text className="text-center font-MontserratBold text-xl">
                5º Passo {'\n'}
                Análise do seu perfil
              </Text>
              <Text className="text-center font-MontserratMedium text-base">
                Nessa etapa iremos avaliar seu perfil e caso esteja tudo certinho iremos liberar seu
                perfil na plataforma.
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
              <Text className="font-MontserratBold text-base text-white">Vamos começar</Text>
            </Button>
          </View>
        </View>
      </CardStack>
    </View>
  );
}
