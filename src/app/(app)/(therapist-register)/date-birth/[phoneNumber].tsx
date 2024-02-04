import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { MaskInput } from '@/components/MaskInput';
import { ProgressBar } from '@/components/ProgressBar';
import { useAuth } from '@/contexts/useAuth';
import { KeyBoardAvoidingViewLayout } from '@/layout/KeyboardAvoidingViewLayout';
import { UserQuery } from '@/queries/user';

const dateOfBirthSchema = z.object({
  DateOfBirth: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' })
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Data de nascimento inválida' }),
});

type PhoneRegisterFormValues = z.infer<typeof dateOfBirthSchema>;

export default function DateOfBirthRegister() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const { userData } = useAuth();
  const { mutate: updateUserData, isLoading } = UserQuery.Update({
    onSuccess: () => {
      router.push('/(app)/(therapist-register)/photo');
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PhoneRegisterFormValues>({
    mode: 'all',
    resolver: zodResolver(dateOfBirthSchema),
  });

  const onSubmit = async ({ DateOfBirth }: PhoneRegisterFormValues) => {
    const invertedDateOfBirth = DateOfBirth.split('/').reverse().join('');

    updateUserData({
      s_birthdate: invertedDateOfBirth,
      s_cellphone: phoneNumber,
      userId: userData?.id,
    });
  };

  return (
    <KeyBoardAvoidingViewLayout
      header={
        <View className="mt-4 space-y-4 px-6">
          <ProgressBar progress={40} />
          <Text className="font-MontserratSemiBold text-base text-white">
            2º Passo - Data de nascimento
          </Text>
        </View>
      }>
      <View className="mt-6 items-center space-y-4">
        <Text className="font-MontserratBold text-lg">Qual é a sua data nascimento?</Text>
        <Controller
          name="DateOfBirth"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <MaskInput
                isValid={isValid}
                placeholder="DD/MM/YYYY"
                value={value}
                onBlur={onBlur}
                error={errors.DateOfBirth?.message}
                keyboardType="number-pad"
                onChangeText={(maskedDateOfBirth) => {
                  onChange(maskedDateOfBirth);
                }}
                mask={Masks.DATE_DDMMYYYY}
              />
            );
          }}
        />
      </View>

      <View className="absolute bottom-12 right-4">
        <Button
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
          variant="rounded">
          <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
        </Button>
      </View>
    </KeyBoardAvoidingViewLayout>
  );
}
