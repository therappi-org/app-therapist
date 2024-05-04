import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { RegistrationStatus } from '@/components/RegistrationStatus';
import { useAuth } from '@/contexts/useAuth';
import { UserQuery } from '@/queries/user';
import colors from '@/theme/colors';

export default function Home() {
  const { userData } = useAuth();

  const { data: registrationWarningData } = UserQuery.Warnings({ userId: userData?.id });

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
              {registrationWarningData && (
                <RegistrationStatus registrationWarningData={registrationWarningData} />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
