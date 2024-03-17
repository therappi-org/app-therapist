import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardStack } from '@/layout/CardStack';
import { storeData } from '@/utils/asyncStoreData';
import { THERAPIST_REGISTERED_KEY } from '@/utils/constants';

export default function TherapyFeedback() {
  return (
    <CardStack>
      <View className="flex-1 px-4 py-6">
        <View className="mt-12 flex-1 items-center justify-center">
          <Image
            className="h-48 w-52"
            alt="Logo"
            source={require('@/assets/images/successful.svg')}
          />

          <View className="mt-10 gap-2">
            <Text className="text-center font-MontserratBold text-xl text-gray-800">
              Maravilha! A Terapia foi cadastrada com sucesso!
            </Text>
          </View>
        </View>

        <View className="w-full flex-col justify-between gap-2">
          <Link asChild replace href="/(app)/(tabs)">
            <Button
              onPress={async () => {
                await storeData(THERAPIST_REGISTERED_KEY, JSON.stringify(true));
              }}
              className="w-full">
              <Text className="font-MontserratBold text-base text-gray-50">Acessar a Home</Text>
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
