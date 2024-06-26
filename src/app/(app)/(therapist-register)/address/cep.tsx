import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import Animated from 'react-native-reanimated';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { MaskInput } from '@/components/MaskInput';
import { ProgressBar } from '@/components/ProgressBar';
import { useAuth } from '@/contexts/useAuth';
import { useAnimatedKeyboardAwareStyle } from '@/hooks/useAnimatedKeyboardAwareStyle';
import { KeyBoardAvoidingViewLayout } from '@/layout/KeyboardAvoidingViewLayout';
import { AddressQueries } from '@/queries/address';
import { useTherapyStore } from '@/stories/useTherapyStore';

const cepAddressSchema = z.object({
  cep: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' })
    .regex(/^\d{5}-\d{3}$/, { message: 'CEP inválido' }),
});

type cepAddressFormValues = z.infer<typeof cepAddressSchema>;

export default function CepAddress() {
  const [cep, setCep] = useState('');
  const { userData } = useAuth();
  const animatedStyle = useAnimatedKeyboardAwareStyle();
  const { selectedTherapy } = useTherapyStore((state) => ({
    selectedTherapy: state.selectedTherapy,
  }));

  const { data: registeredAddress } = AddressQueries.GetRegisteredAddress({
    userId: userData?.id,
  });

  const hasRegisteredAddress = registeredAddress?.length;

  const {
    control,
    formState: { errors, isValid },
  } = useForm<cepAddressFormValues>({
    mode: 'all',
    resolver: zodResolver(cepAddressSchema),
  });

  return (
    <KeyBoardAvoidingViewLayout
      header={
        <View className="mt-4 gap-4 px-6">
          <ProgressBar progress={85} />
          <Text className="font-MontserratSemiBold text-base text-white">
            {selectedTherapy?.name}
          </Text>
        </View>
      }>
      <View className="mt-6 items-center gap-4">
        <Text className="font-MontserratBold text-lg">Qual é o CEP do endereço?</Text>
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

      <Animated.View
        style={animatedStyle}
        className="absolute bottom-10 w-full flex-row items-center justify-between px-4">
        <View>
          {!!hasRegisteredAddress && (
            <Button
              className="w-full"
              onPress={() => router.push('/(app)/(therapist-register)/address/registered-address')}
              variant="ghost">
              <Text className="font-MontserratBold text-sm text-brand">Endereços salvos</Text>
            </Button>
          )}
        </View>
        <Link asChild href={`/(app)/(therapist-register)/address/full-address/${cep}`}>
          <Button disabled={!isValid} variant="rounded">
            <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
          </Button>
        </Link>
      </Animated.View>
    </KeyBoardAvoidingViewLayout>
  );
}
