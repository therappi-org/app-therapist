import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { MaskInput } from '@/components/MaskInput';
import { ProgressBar } from '@/components/ProgressBar';
import { KeyBoardAvoidingViewLayout } from '@/layout/KeyboardAvoidingViewLayout';

const dateOfBirthSchema = z.object({
  DateOfBirth: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Data de nascimento inválida' }),
});

type PhoneRegisterFormValues = z.infer<typeof dateOfBirthSchema>;

export default function DateOfBirthRegister() {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PhoneRegisterFormValues>({
    mode: 'all',
    resolver: zodResolver(dateOfBirthSchema),
  });

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
                onChangeText={(maskedDateOfBirth, unmaskedDateOfBirth) => {
                  setDateOfBirth(unmaskedDateOfBirth);
                  onChange(maskedDateOfBirth);
                }}
                mask={Masks.DATE_DDMMYYYY}
              />
            );
          }}
        />
      </View>

      <View className="absolute bottom-12 right-4">
        <Link asChild href="/(app)/(therapist-register)/photo">
          <Button disabled={!isValid} variant="rounded">
            <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
          </Button>
        </Link>
      </View>
    </KeyBoardAvoidingViewLayout>
  );
}
