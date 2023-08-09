import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardStack } from '@/layout/CardStack';

export default function Intro() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-full items-center bg-brand pt-11">
        <Image className="h-16 w-48" source={require('@/assets/images/logo-only-text.svg')} />
      </View>

      <CardStack>
        <View className="flex-1 items-center rounded-3xl bg-white px-4 pb-8 pt-10">
          <Text className="mb-4 text-center font-MontserratBold text-xl">
            Seja bem-vindo {'\n'}ao Therappi
          </Text>
          <Text className="mb-5 text-center font-MontserratMedium text-base">
            Cadastre seus serviços e tenha acesso a clientes em busca de atendimentos de forma
            simples e gratuita
          </Text>
          <Text className="text-center font-MontserratMedium text-base">
            Novo por aqui? {'\n'}Nós te explicamos tudo 😉
          </Text>

          <View className="mt-auto space-y-8">
            <Link asChild href="/(walkthrough)/step-1">
              <Button>
                <View className="flex-row items-center gap-5">
                  <Text className="font-MontserratBold text-base text-white">
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

            <Button variant="ghost">
              <View>
                <Text className="font-MontserratBold text-base text-brand">
                  Já conheço o produto :)
                </Text>
              </View>
            </Button>
          </View>
        </View>
      </CardStack>
    </View>
  );
}
