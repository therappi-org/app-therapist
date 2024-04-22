import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { Dimensions, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardStack } from '@/layout/CardStack';
import colors from '@/theme/colors';
import { cn } from '@/utils/lib';

export default function Photo() {
  const { height } = Dimensions.get('window');
  const isSmallDevice = height <= 700;

  return (
    <View className="w-full flex-1 items-center justify-center">
      <CardStack>
        <View className="flex-1 items-center justify-center rounded-3xl bg-white px-4 pb-8 pt-10">
          <View className="flex-1 items-center justify-center">
            <Image
              className={cn('h-52 w-52', isSmallDevice && 'h-40 w-40')}
              source={require('@/assets/images/walkthrough-step-2.svg')}
            />

            <View className="mt-6 gap-7">
              <Text
                className={cn(
                  'text-center font-MontserratBold text-xl',
                  isSmallDevice && 'text-sm'
                )}>
                Hora de adicionar sua foto de perfil profissional
              </Text>
              <Text
                className={cn(
                  'text-center font-MontserratMedium text-base',
                  isSmallDevice && 'text-xs'
                )}>
                Capriche na foto
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
            <Link asChild href="/(app)/(therapist-register)/photo/addPhoto">
              <Button
                className={cn('w-full max-w-[208px]', isSmallDevice && 'h-12 w-fit p-0 px-2 ')}>
                <View className="flex-row items-center gap-4">
                  <Text
                    className={cn(
                      'font-MontserratBold text-base text-white',
                      isSmallDevice && 'text-xs'
                    )}>
                    Adicionar foto
                  </Text>
                  <Feather
                    name="arrow-right"
                    size={isSmallDevice ? 20 : 24}
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
