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

const cepAddressSchema = z.object({
  cep: z
    .string()
    .regex(/^\d{5}-\d{3}$/, { message: 'CEP inválido' })
    .nonempty({ message: 'Campo obrigatório' }),
});

type cepAddressFormValues = z.infer<typeof cepAddressSchema>;

export default function CepAddress() {
  const [cep, setCep] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<cepAddressFormValues>({
    mode: 'all',
    resolver: zodResolver(cepAddressSchema),
  });

  return (
    <KeyBoardAvoidingViewLayout
      header={
        <View className="mt-4 space-y-4 px-6">
          <ProgressBar progress={60} />
          <Text className="font-MontserratSemiBold text-base text-white">1/4 Psicologia</Text>
        </View>
      }>
      <View className="mt-6 items-center space-y-4">
        <Text className="font-MontserratBold text-lg">Qual é o CEP do seu endereço?</Text>
        <Controller
          name="cep"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <MaskInput
                isValid={isValid}
                placeholder="00000-000"
                value={value}
                onBlur={onBlur}
                error={errors.cep?.message}
                keyboardType="number-pad"
                onChangeText={(maskedCep, unmaskedCep) => {
                  setCep(unmaskedCep);
                  onChange(maskedCep);
                }}
                mask={Masks.ZIP_CODE}
              />
            );
          }}
        />
      </View>

      <View className="absolute bottom-12 right-6">
        <Link asChild href={`/(app)/(therapist-register)/address/full-address/${cep}`}>
          <Button disabled={!isValid} variant="rounded">
            <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
          </Button>
        </Link>
      </View>
    </KeyBoardAvoidingViewLayout>
  );
}
