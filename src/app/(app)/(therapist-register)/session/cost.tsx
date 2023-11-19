import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { MaskInput } from '@/components/MaskInput';
import { ProgressBar } from '@/components/ProgressBar';
import { KeyBoardAvoidingViewLayout } from '@/layout/KeyboardAvoidingViewLayout';

const sessionCostSchema = z.object({
  currency: z
    .string()
    .nonempty({ message: 'Campo obrigatório' })
    .refine(
      (value) => {
        const number = Number(value.replace(/[^0-9]/g, ''));
        return number > 0;
      },
      { message: 'Valor inválido' }
    ),
});

type sessionCostFormValues = z.infer<typeof sessionCostSchema>;

export default function SessionCost() {
  const [currency, setCurrency] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<sessionCostFormValues>({
    mode: 'all',
    resolver: zodResolver(sessionCostSchema),
  });

  return (
    <KeyBoardAvoidingViewLayout
      header={
        <View className="mt-4 space-y-4 px-6">
          <ProgressBar progress={90} />
          <Text className="font-MontserratSemiBold text-base text-white">1/4 Psicologia</Text>
        </View>
      }>
      <View className="mt-6 items-center space-y-4">
        <Text className="font-MontserratBold text-lg">Qual é o valor do sessão?</Text>
        <Controller
          name="currency"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <MaskInput
                isValid={isValid}
                placeholder="Ex. R$0,00"
                value={value}
                onBlur={onBlur}
                error={errors.currency?.message}
                keyboardType="number-pad"
                onChangeText={(maskedCurrency, unmaskedCurrency) => {
                  setCurrency(unmaskedCurrency);
                  onChange(maskedCurrency);
                }}
                mask={Masks.BRL_CURRENCY}
              />
            );
          }}
        />
      </View>

      <View className="absolute bottom-12 right-6">
        <Link asChild href="/(app)/(therapist-register)/session/duration">
          <Button disabled={!isValid} variant="rounded">
            <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
          </Button>
        </Link>
      </View>
    </KeyBoardAvoidingViewLayout>
  );
}
