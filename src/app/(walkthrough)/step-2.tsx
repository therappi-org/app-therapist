import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { StepSphere } from '@/components/StepSphere';
import { CardStack } from '@/layout/CardStack';
import colors from '@/theme/colors';

export default function StepTwo() {
  return (
    <View className="w-full flex-1 items-center justify-center">
      <CardStack>
        <View className="flex-1 items-center rounded-3xl bg-white px-4 pb-8 pt-10">
          <View className="self-end">
            <Button variant="ghost">
              <Text className="text-center font-MontserratBold text-base text-gray-800">Pular</Text>
            </Button>
          </View>

          <Image className="h-52 w-52" source={require('@/assets/images/walkthrough-step-2.svg')} />
          <View className="mt-2">
            <StepSphere step={2} />
          </View>

          <View className="mt-6 space-y-2">
            <Text className="text-center font-MontserratBold text-xl">
              2º Passo{'\n'}
              Personalize sua área
            </Text>
            <Text className="font-base text-center font-MontserratMedium">
              Depois do cadastro aprovado, você {'\n'}poderá personalizar sua área podendo adicionar
              fotos e mais outros detalhes.
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
            <Link asChild href="/(walkthrough)/step-3">
              <Button className="w-full max-w-[208px]">
                <View className="flex-row items-center gap-4">
                  <Text className="font-MontserratBold text-base text-white">Próximo passo</Text>
                  <Feather
                    name="arrow-right"
                    size={24}
                    color="white"
                    backgroundColor="transparent"
                  />
                </View>
              </Button>
            </Link>
          </View>
        </View>
      </CardStack>
    </View>
  );
}
