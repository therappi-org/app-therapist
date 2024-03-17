import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardStack } from '@/layout/CardStack';
import colors from '@/theme/colors';

export default function Photo() {
  return (
    <View className="w-full flex-1 items-center justify-center">
      <CardStack>
        <View className="flex-1 items-center justify-center rounded-3xl bg-white px-4 pb-8 pt-10">
          <View className="flex-1 items-center justify-center">
            <Image
              className="h-52 w-52"
              source={require('@/assets/images/walkthrough-step-2.svg')}
            />

            <View className="mt-6 gap-7">
              <Text className="text-center font-MontserratBold text-xl">
                Hora de adicionar sua foto de perfil profissional
              </Text>
              <Text className=" text-center font-MontserratMedium text-base">Capriche na foto</Text>
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
            <Link asChild href="/(app)/(therapist-register)/photo/addPhoto">
              <Button className="w-full max-w-[208px]">
                <View className="flex-row items-center gap-4">
                  <Text className="font-MontserratBold text-base text-white">Adicionar foto</Text>
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
