import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Dimensions, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardStack } from '@/layout/CardStack';
import { storeData } from '@/utils/asyncStoreData';
import { THERAPIST_STORE_WALKTHROUGH_KEY } from '@/utils/constants';
import { cn } from '@/utils/lib';

export default function Intro() {
  const { height } = Dimensions.get('window');
  const isSmallDevice = height <= 700;

  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-full items-center bg-brand pt-11">
        <Image
          className="h-[47px] w-[132px]"
          source={require('@/assets/images/logo-only-text.svg')}
        />
      </View>

      <CardStack>
        <View className="flex-1 items-center rounded-3xl bg-white px-4 pb-8 pt-10">
          <Text
            className={cn(
              'mb-4 text-center font-MontserratBold text-xl',
              isSmallDevice && 'text-base'
            )}>
            Seja bem-vindo {'\n'}
            ao Therappi
          </Text>
          <Text
            className={cn(
              'mb-5 text-center font-MontserratMedium text-base',
              isSmallDevice && 'text-xs'
            )}>
            Muito obrigado por estar conosco
          </Text>

          <Text
            className={cn(
              'mb-10 text-center font-MontserratMedium text-base',
              isSmallDevice && 'mb-5 text-xs'
            )}>
            Para que possa desfrutar da plataforma é necessário informar alguns dados pessoais e
            profissionais. Mas não se preocupe, iremos te guiar.
          </Text>
          <Text
            className={cn(
              'text-center font-MontserratMedium text-base',
              isSmallDevice && 'text-xs'
            )}>
            Nós te explicamos tudo 😉
          </Text>

          <View className="mt-auto">
            <Link asChild href="/(app)/(walkthrough)/step-1">
              <Button className={cn(isSmallDevice && 'px-4 py-2')}>
                <View className="flex-row items-center gap-5">
                  <Text className="text-sx font-MontserratBold text-white">
                    Saiba como funciona
                  </Text>
                  <Feather
                    name="arrow-right"
                    size={24}
                    color="white"
                    backgroundColor="transparent"
                  />
                </View>
              </Button>
            </Link>
            <Link asChild replace href="/(app)/(therapist-register)/phoneNumber">
              <Button
                onPress={async () =>
                  await storeData(THERAPIST_STORE_WALKTHROUGH_KEY, JSON.stringify(true))
                }
                variant="ghost">
                <View>
                  <Text className="font-MontserratBold text-base text-brand">
                    Já conheço o produto :)
                  </Text>
                </View>
              </Button>
            </Link>
          </View>
        </View>
      </CardStack>
    </View>
  );
}
