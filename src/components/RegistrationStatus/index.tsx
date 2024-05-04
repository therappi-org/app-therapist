import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

import colors from '@/theme/colors';
import { WarningData } from '@/types/user';
import { hexToRGBA } from '@/utils/hextorgba';

type RegistrationStatusProps = {
  registrationWarningData: WarningData[] | undefined;
};

const statusIndicatorConfig = {
  P: {
    color: colors.feedback['warning'],
    iconName: 'alert-triangle',
  },
  I: {
    color: colors.gray['500'],
    iconName: 'star',
  },
  A: {
    color: colors.feedback['success'],
    iconName: 'check',
  },
  R: {
    color: colors.feedback['error'],
    iconName: 'x',
  },
} as const;

export const RegistrationStatus = ({ registrationWarningData }: RegistrationStatusProps) => {
  return (
    <View className="flex-1 shadow-custom-light">
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
          {registrationWarningData?.map((status) => (
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
                {`${status?.s_warning ?? ''} ${status?.s_reason ? ': ' + status?.s_reason : ''}`}
              </Text>
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
