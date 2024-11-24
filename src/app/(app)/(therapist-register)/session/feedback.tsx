import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Dimensions, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardStack } from '@/layout/CardStack';
import { storeData } from '@/utils/asyncStoreData';
import { THERAPIST_REGISTERED_KEY } from '@/utils/constants';
import { cn } from '@/utils/lib';

export default function TherapyFeedback() {
  const { height } = Dimensions.get('window');
  const isSmallDevice = height <= 700;

  return (
    <CardStack>
      <View className="flex-1 px-4 py-6">
        <View className="mt-12 flex-1 items-center justify-center">
          <Image
            className={cn('h-52 w-52', isSmallDevice && 'h-40 w-40')}
            alt="Logo"
            source={require('@/assets/images/successful.svg')}
          />

          <View className="mt-10 gap-2">
            <Text
              className={cn('text-center font-MontserratBold text-xl', isSmallDevice && 'text-sm')}>
              Maravilha! A Terapia foi cadastrada com sucesso!
            </Text>
          </View>
        </View>

        <View className="w-full flex-col justify-between gap-2">
          <Link asChild replace href="/(app)/(therapist-register)/attendance">
            <Button className="w-full">
              <Text className="font-MontserratBold text-base text-gray-50">
                Configurar atendimento
              </Text>
            </Button>
          </Link>
          <Link
            asChild
            replace
            href="/(app)/(therapist-register)/profissional-data/therapy/select-therapy">
            <Button variant="ghost">
              <Text className="font-MontserratBold text-base text-brand">
                Cadastrar nova terapia
              </Text>
            </Button>
          </Link>
        </View>
      </View>
    </CardStack>
  );
}
