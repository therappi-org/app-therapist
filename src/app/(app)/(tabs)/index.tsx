import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/useAuth';
import colors from '@/theme/colors';

export default function Home() {
  const { userData } = useAuth();

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-4 pb-4">
          <View className="mt-8 flex-row justify-between">
            <View>
              <Text className="font-MontserratSemiBold text-base text-gray-600">
                Bem vindo de volta
              </Text>
              <Text className="font-MontserratBold text-2xl text-gray-600">
                {userData?.sName ?? ''}
              </Text>
            </View>

            <View className="flex-row gap-4">
              <Button variant="rounded" className="bg-white shadow-custom-light">
                <Feather
                  name="help-circle"
                  size={24}
                  color={colors.brand['DEFAULT']}
                  backgroundColor="transparent"
                />
              </Button>
              <Button variant="rounded" className="bg-white shadow-custom-light">
                <Feather
                  name="bell"
                  size={24}
                  color={colors.brand['DEFAULT']}
                  backgroundColor="transparent"
                />
              </Button>
            </View>
          </View>

          <View className="mt-8 gap-4">
            <Text className="font-MontserratBold text-base text-gray-600">Meus ganhos</Text>
            <View className="h-24 w-full rounded-lg border-l-8 border-l-feedback-success bg-gray-50 px-4 shadow-custom-light">
              <View className="w-full flex-1 flex-row items-center justify-between">
                <View className="h-20 w-24">
                  <Image
                    contentFit="contain"
                    className="flex-1"
                    source={require('@/assets/images/money.png')}
                    // source={require('@/assets/images/money-image.svg')}
                    // source={require('@/assets/images/map-pin.svg')}
                  />
                </View>

                <View className="flex-row items-center gap-2">
                  <Text className="font-MontserratSemiBold text-sm text-gray-600">R$</Text>
                  <Text className="font-MontserratSemiBold text-2xl text-gray-600">0,00</Text>
                  <Feather
                    name="chevron-right"
                    size={24}
                    color={colors.feedback['success']}
                    backgroundColor="transparent"
                  />
                </View>
              </View>
            </View>

            <View className="mt-8 gap-4">
              <Text className="font-MontserratBold text-base text-gray-600">Pra ficar de olho</Text>

              <View
                className="flex-1 shadow-custom-light"
                style={{
                  shadowColor: colors.gray['500'],
                  shadowOpacity: 0.1,
                }}>
                <View className="rounded-t-lg bg-white px-5 py-8">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-MontserratBold text-base text-gray-600">
                      Status do seu cadastro
                    </Text>

                    <View className="h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                      <Text className="font-MontserratBold text-base text-brand-100">65%</Text>
                    </View>
                  </View>

                  <View className="flex-1 gap-4">
                    <View className="flex-row items-center gap-4">
                      <View className="h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                        <Feather
                          name="check"
                          size={16}
                          color={colors.brand['DEFAULT']}
                          backgroundColor="transparent"
                        />
                      </View>
                      <Text className="font-MontserratSemiBold text-sm text-gray-600">
                        Cadastro aprovado
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-4">
                      <View className="h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                        <Feather
                          name="check"
                          size={16}
                          color={colors.brand['DEFAULT']}
                          backgroundColor="transparent"
                        />
                      </View>
                      <Text className="font-MontserratSemiBold text-sm text-gray-600">
                        Dados técnicos aprovados
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-4">
                      <View className="h-8 w-8 items-center justify-center rounded-full bg-feedback-success/10">
                        <Feather
                          name="clipboard"
                          size={16}
                          color={colors.feedback['success']}
                          backgroundColor="transparent"
                        />
                      </View>
                      <Text className="font-MontserratSemiBold text-sm text-gray-600">
                        Cadastro aprovado
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-4">
                      <View className="h-8 w-8 items-center justify-center rounded-full bg-gray-600/10">
                        <Feather
                          name="star"
                          size={16}
                          color={colors.gray['500']}
                          backgroundColor="transparent"
                        />
                      </View>
                      <Text className="font-MontserratSemiBold text-sm text-gray-600">
                        Cadastro aprovado
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="min-h-16 items-center justify-center rounded-b-lg bg-gray-100 py-5">
                  <Text className="font-MontserratBold text-base text-brand">
                    Completar meu cadastro
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
