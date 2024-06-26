import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/Card';
import { useAuth } from '@/contexts/useAuth';
import { AddressQueries } from '@/queries/address';
import { useTherapyStore } from '@/stories/useTherapyStore';
import colors from '@/theme/colors';
import { Address } from '@/types/address';

export default function RegisteredAddress() {
  const { userData } = useAuth();
  const insets = useSafeAreaInsets();

  const { data: registeredAddress } = AddressQueries.GetRegisteredAddress({
    userId: userData!.id,
  });

  const { setAddress } = useTherapyStore((state) => ({
    setAddress: state.setAddress,
  }));

  const handleOnPressAddress = (address: Address) => {
    setAddress({
      id: address.id,
      cep: address.sZipcode,
      logradouro: address.sStreet,
      numero: String(address.nBuildNumber ?? ''),
      complemento: address.sComplement,
      bairro: address.sNeighborhood,
      localidade: address.sCity,
      uf: address.sState,
    });

    router.push(`../`);

    router.navigate('/(app)/(therapist-register)/session/cost');
  };

  const transformZipcode = (zipcode: string) => {
    return zipcode.slice(0, 5) + '-' + zipcode.slice(5);
  };

  return (
    <View className="flex-1 bg-brand" style={{ paddingBottom: insets.bottom }}>
      <View className="mt-8 flex-1">
        <Text className="px-6 font-MontserratBold text-base text-white">
          Selecione um endereço para continuar
        </Text>

        <ScrollView className="mt-4 h-full flex-1 gap-4 px-6" showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            className="mb-2 w-full"
            activeOpacity={0.7}
            onPress={() => {
              router.push(`../`);

              router.navigate('/(app)/(therapist-register)/address/cep');
            }}>
            <Card.Root>
              <Card.Content className="gap-4 p-2" title="Adicionar novo endereço" />
              <Feather name="plus" size={24} color={colors.brand.DEFAULT} />
            </Card.Root>
          </TouchableOpacity>

          {registeredAddress
            ?.filter((address) => !address.bVirtual)
            ?.map((address) => (
              <View key={address.id} className="mb-2 flex-1">
                <TouchableOpacity
                  className="h-full w-full"
                  activeOpacity={0.7}
                  onPress={() => handleOnPressAddress(address)}>
                  <Card.Root>
                    <Card.Content
                      title={`${address?.sStreet ?? ''}${address?.nBuildNumber ? ', ' + address?.nBuildNumber : ''}`}
                      subtitle={`${address?.sCity ?? ''}${address?.sState ? ' - ' + address?.sState : ''}${address?.sZipcode ? ' - ' + transformZipcode(address?.sZipcode) : ''}`}
                      image={{
                        source: require('@/assets/images/map-pin.svg'),
                        className: 'h-8 w-8',
                      }}
                    />

                    <Feather name="chevron-right" size={24} color={colors.brand.DEFAULT} />
                  </Card.Root>
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}
