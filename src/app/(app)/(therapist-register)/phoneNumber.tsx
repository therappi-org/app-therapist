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

const phoneRegisterSchema = z.object({
  phone: z
    .string({ required_error: 'Campo obrigatório' })
    .regex(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/, { message: 'Telefone inválido' })
    .min(1, { message: 'Campo obrigatório' }),
});

type PhoneRegisterFormValues = z.infer<typeof phoneRegisterSchema>;

export default function PhoneRegister() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const {
    control,
    formState: { errors, isValid },
  } = useForm<PhoneRegisterFormValues>({
    mode: 'all',
    resolver: zodResolver(phoneRegisterSchema),
  });

  return (
    <KeyBoardAvoidingViewLayout
      header={
        <View className="mt-4 gap-4 px-6">
          <ProgressBar progress={20} />
          <Text className="font-MontserratSemiBold text-base text-white">
            1º Passo - Número do telefone
          </Text>
        </View>
      }>
      <View className="mt-6 items-center gap-4">
        <Text className="font-MontserratBold text-lg">Qual é o número do telefone?</Text>
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <MaskInput
                isValid={isValid}
                placeholder="(00) 00000-0000"
                value={value}
                onBlur={onBlur}
                error={errors.phone?.message}
                keyboardType="number-pad"
                onChangeText={(maskedPhone, unmaskedPhone) => {
                  setPhoneNumber(unmaskedPhone);
                  onChange(maskedPhone);
                }}
                mask={Masks.BRL_PHONE}
              />
            );
          }}
        />
      </View>

      <View className="absolute bottom-12 right-4">
        <Link asChild href={`/(app)/(therapist-register)/date-birth/${phoneNumber}`}>
          <Button disabled={!isValid} variant="rounded">
            <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
          </Button>
        </Link>
      </View>
    </KeyBoardAvoidingViewLayout>
  );
}
