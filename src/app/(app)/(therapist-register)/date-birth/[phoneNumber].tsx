import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';

const dateOfBirthSchema = z.object({
  DateOfBirth: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Data de nascimento inválida' }),
});

type PhoneRegisterFormValues = z.infer<typeof dateOfBirthSchema>;

export default function DateOfBirthRegister() {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const { phoneNumber } = useSearchParams<{ phoneNumber: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PhoneRegisterFormValues>({
    mode: 'all',
    resolver: zodResolver(dateOfBirthSchema),
  });

  return (
    <View className="flex-1 bg-brand">
      <View className="mt-4 space-y-4 px-6">
        <ProgressBar progress={40} />
        <Text className="font-MontserratSemiBold text-base text-white">
          2º Passo - Data de nascimento
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        className="mt-8 w-full flex-1 items-center rounded-t-2xl bg-white px-2">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="w-full flex-1">
            <View className="mt-6 items-center space-y-4">
              <Text className="font-MontserratBold text-lg">Qual é a sua data nascimento?</Text>
              <Controller
                name="DateOfBirth"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <>
                      <MaskInput
                        className={` h-10 w-full text-center font-MontserratBold text-lg ${
                          isValid ? 'text-brand' : 'text-feedback-error'
                        }`}
                        placeholder="DD/MM/YYYY"
                        value={value}
                        onBlur={onBlur}
                        keyboardType="number-pad"
                        onChangeText={(maskedDateOfBirth, unmaskedDateOfBirth) => {
                          setDateOfBirth(unmaskedDateOfBirth);
                          onChange(maskedDateOfBirth);
                        }}
                        mask={Masks.DATE_DDMMYYYY}
                      />
                      {errors.DateOfBirth && (
                        <Text className="pt-2 text-center font-MontserratBold text-xs text-feedback-error">
                          {errors.DateOfBirth.message}
                        </Text>
                      )}
                    </>
                  );
                }}
              />
            </View>

            <View className="absolute bottom-12 right-6">
              <Link asChild href="/(app)/(therapist-register)/photo">
                <Button disabled={!isValid} variant="rounded">
                  <Feather
                    name="arrow-right"
                    size={24}
                    color="#fff"
                    backgroundColor="transparent"
                  />
                </Button>
              </Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
