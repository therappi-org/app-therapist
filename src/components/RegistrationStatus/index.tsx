import { Feather, FontAwesome } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';

import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { height } = Dimensions.get('window');
  const isSmallDevice = height <= 700;

  const handlePresentModalPress = useCallback((WarningData: WarningData) => {
    bottomSheetModalRef.current?.present();

    console.log(WarningData);
  }, []);

  return (
    <View className="flex-1 shadow-custom-light">
      <View className="flex-1 rounded-t-lg bg-white px-5 py-8">
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
            <View
              key={status.s_warning + status.s_status + status.s_reason}
              className="flex-1 flex-row items-center justify-between">
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

                  <BottomSheet
                    bottomSheetModalRef={bottomSheetModalRef}
                    title="Revisão de informação">
                    <View className="flex-1 items-center">
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
                  </BottomSheet>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
      {registrationWarningData?.some((status) => status?.s_status === 'I') && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/(app)/(tabs)/profile')}
          className="min-h-16 items-center justify-center rounded-b-lg bg-gray-100 py-5">
          <Text className="font-MontserratBold text-base text-brand">Completar meu cadastro</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
