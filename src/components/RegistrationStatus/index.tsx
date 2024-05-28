import { Feather, FontAwesome } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import React, { useCallback, useRef } from 'react';
import { View, Text, Dimensions } from 'react-native';

import { Button } from '../Button';

import colors from '@/theme/colors';
import { WarningData } from '@/types/user';
import { hexToRGBA } from '@/utils/hexToRGBA';
import { cn } from '@/utils/lib';

type RegistrationStatusProps = {
  registrationWarningData: WarningData[] | undefined;
};

const statusIndicatorConfig = {
  P: {
    color: colors.feedback['warning'],
    iconName: 'alert-triangle',
    status: 'em análise',
  },
  I: {
    color: colors.gray['500'],
    iconName: 'star',
    status: 'completar',
    screens: {
      // trocar para as telas corretas
      SC: 'Configuração de agenda',
      BA: 'Configuração de conta bancária',
      TH: 'Configuração de terapia',
      PE: 'Configuração pessoal',
    },
  },
  A: {
    color: colors.feedback['success'],
    iconName: 'check',
    status: 'aprovado',
  },
  R: {
    color: colors.feedback['error'],
    iconName: 'x',
    status: 'revisar',
  },
} as const;

export const RegistrationStatus = ({ registrationWarningData }: RegistrationStatusProps) => {
  console.log(registrationWarningData);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { height } = Dimensions.get('window');
  const isSmallDevice = height <= 700;

  const handlePresentModalPress = useCallback((WarningData: WarningData) => {
    bottomSheetModalRef.current?.present();

    console.log(WarningData);
  }, []);

  return (
    <View className="flex-1 shadow-custom-light">
      <View className="rounded-t-lg bg-white px-5 py-8">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="font-MontserratBold text-base text-gray-600">
            Status do seu cadastro
          </Text>

          <View className="h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <Text className="font-MontserratBold text-base text-brand-100">65%</Text>
          </View>
        </View>

        <View className="flex-1 gap-4">
          {registrationWarningData?.map((status) => (
            <View key={status?.s_warning} className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <View
                  className="h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                  style={{
                    backgroundColor: hexToRGBA(statusIndicatorConfig[status?.s_status].color, 0.1),
                  }}>
                  <Feather
                    name={statusIndicatorConfig[status?.s_status].iconName}
                    size={16}
                    color={statusIndicatorConfig[status?.s_status].color}
                  />
                </View>
                <Text className="font-MontserratSemiBold text-sm text-gray-600">
                  {`${status?.s_warning ?? ''}: ${statusIndicatorConfig[status?.s_status].status}`}
                </Text>
              </View>

              {status?.s_status === 'R' && (
                <View>
                  <Button
                    variant="ghost"
                    className="h-fit w-fit p-0"
                    onPress={() => handlePresentModalPress(status)}>
                    <Feather
                      name="chevron-right"
                      size={16}
                      color={colors.brand['DEFAULT']}
                      backgroundColor="transparent"
                    />
                  </Button>

                  <View>
                    <BottomSheetModal ref={bottomSheetModalRef} snapPoints={['60%']}>
                      <BottomSheetView className="flex-1 px-4 pt-8">
                        <View className="flex-row items-center justify-between">
                          <Text className="flex-1 font-MontserratBold text-lg text-gray-600">
                            Revisar cadastro
                          </Text>
                          <Button
                            variant="rounded"
                            className="mr-2 h-10 w-10 bg-gray-100"
                            onPress={() => bottomSheetModalRef?.current?.dismiss()}>
                            <Feather name="x" size={24} color={colors.brand['DEFAULT']} />
                          </Button>
                        </View>
                        <View className="mb-4 flex-1 items-center">
                          <Image
                            source={require('@/assets/images/error.svg')}
                            className={cn('h-52 w-52', isSmallDevice && 'h-40 w-40')}
                          />

                          <Text className="font-MontserratSemiBold text-base text-gray-600">
                            Por favor, revise a informação abaixo:
                          </Text>

                          <Text className="font-MontserratBold text-base text-feedback-error">
                            {status?.s_reason}
                          </Text>

                          <Button
                            className="mt-auto"
                            onPress={() => {
                              Linking.openURL('https://wa.link/cuqaa0');
                              bottomSheetModalRef?.current?.dismiss();
                            }}>
                            <View className="mt-auto flex-row items-center gap-2">
                              <Text className="text-bas font-MontserratBold text-white">
                                Falar com o atendimento
                              </Text>
                              <FontAwesome name="whatsapp" size={16} color="white" />
                            </View>
                          </Button>
                        </View>
                      </BottomSheetView>
                    </BottomSheetModal>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      <View className="min-h-16 items-center justify-center rounded-b-lg bg-gray-100 py-5">
        <Text className="font-MontserratBold text-base text-brand">Completar meu cadastro</Text>
      </View>
    </View>
  );
};
