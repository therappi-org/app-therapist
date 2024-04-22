import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { Dimensions, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { StepSphere } from '@/components/StepSphere';
import { CardStack } from '@/layout/CardStack';
import colors from '@/theme/colors';
import { storeData } from '@/utils/asyncStoreData';
import { THERAPIST_STORE_WALKTHROUGH_KEY } from '@/utils/constants';
import { cn } from '@/utils/lib';

export default function StepFive() {
  const { height } = Dimensions.get('window');
  const isSmallDevice = height <= 700;

  return (
    <View className="w-full flex-1 items-center justify-center">
      <CardStack>
        <View className="flex-1 items-center justify-center rounded-3xl bg-white px-4 pb-8 pt-14">
          <View className="flex-1 items-center justify-center">
            <Image
              className={cn('h-52 w-52', isSmallDevice && 'h-40 w-40')}
              source={require('@/assets/images/walkthrough-step-5.svg')}
            />
            <View className="mt-2">
              <StepSphere step={5} />
            </View>

            <View className="mt-6 gap-2">
              <Text
                className={cn(
                  'text-center font-MontserratBold text-xl',
                  isSmallDevice && 'text-sm'
                )}>
                5º Passo {'\n'}
                Análise do seu perfil
              </Text>
              <Text
                className={cn(
                  'text-center font-MontserratMedium text-base',
                  isSmallDevice && 'text-xs'
                )}>
                Nessa etapa iremos avaliar seu perfil e caso esteja tudo certinho iremos liberar seu
                perfil na plataforma.
              </Text>
            </View>
          </View>

          <View className="w-full flex-row justify-between">
            <Button
              className={cn('bg-gray-100', isSmallDevice && 'h-12 w-12')}
              variant="rounded"
              onPress={() => router.back()}>
              <Feather
                name="arrow-left"
                size={isSmallDevice ? 20 : 24}
                color={colors.gray[600]}
                backgroundColor="transparent"
              />
            </Button>
            <Link replace asChild href="/(app)/(therapist-register)/phoneNumber">
              <Button
                onPress={async () =>
                  await storeData(THERAPIST_STORE_WALKTHROUGH_KEY, JSON.stringify(true))
                }
                className={cn('w-full max-w-[208px]', isSmallDevice && 'h-12 w-fit p-0 px-2 ')}>
                <Text
                  className={cn(
                    'font-MontserratBold text-base text-white',
                    isSmallDevice && 'text-xs'
                  )}>
                  Vamos começar
                </Text>
              </Button>
            </Link>
          </View>
        </View>
      </CardStack>
    </View>
  );
}
