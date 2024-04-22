import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import Animated from 'react-native-reanimated';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { MaskInput } from '@/components/MaskInput';
import { ProgressBar } from '@/components/ProgressBar';
import { useAnimatedKeyboardAwareStyle } from '@/hooks/useAnimatedKeyboardAwareStyle';
import { KeyBoardAvoidingViewLayout } from '@/layout/KeyboardAvoidingViewLayout';
import { useTherapyStore } from '@/stories/useTherapyStore';

const sessionCostSchema = z.object({
  currency: z.string({ required_error: 'Campo obrigatório' }).refine(
    (value) => {
      const number = Number(value.replace(/[^0-9]/g, ''));
      return number >= 100 && number <= 10000000000;
    },
    { message: 'Valor inválido' }
  ),
});

type sessionCostFormValues = z.infer<typeof sessionCostSchema>;

export default function SessionCost() {
  const animatedStyle = useAnimatedKeyboardAwareStyle();
  const { selectedTherapy, setCurrency } = useTherapyStore((state) => ({
    selectedTherapy: state.selectedTherapy,
    setCurrency: state.setCurrency,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<sessionCostFormValues>({
    mode: 'all',
    resolver: zodResolver(sessionCostSchema),
    defaultValues: { currency: '' },
  });

  const onSubmit = () => {
    router.push('/(app)/(therapist-register)/session/duration');
  };

  const formatAmountToCents = (value: any) => {
    if (!value) return;
    const amountFormatted = (value / 100).toFixed(2).replace('.', '');
    return amountFormatted;
  };

  return (
    <KeyBoardAvoidingViewLayout
      header={
        <View className="mt-4 gap-4 px-6">
          <ProgressBar progress={90} />
          <Text className="font-MontserratSemiBold text-base text-white">
            {selectedTherapy?.name}
          </Text>
        </View>
      }>
      <View className="mt-6 items-center gap-4">
        <Text className="font-MontserratBold text-lg">Qual é o valor do sessão?</Text>
        <Controller
          name="currency"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <MaskInput
                isValid={isValid}
                placeholder="Ex. R$0,00"
                value={formatAmountToCents(value)}
                onBlur={onBlur}
                error={value ? errors.currency?.message : undefined}
                keyboardType="number-pad"
                onChangeText={(_, unmaskedCurrency) => {
                  if (unmaskedCurrency === '0' && unmaskedCurrency.length === 1) return;
                  // console.log(maskedCurrency.slice(3));
                  onChange(unmaskedCurrency);
                  setCurrency(Number(unmaskedCurrency));
                }}
                mask={Masks.BRL_CURRENCY}
              />
            );
          }}
        />
      </View>

      <Animated.View style={animatedStyle} className="absolute bottom-10 right-4">
        <Button onPress={handleSubmit(onSubmit)} disabled={!isValid} variant="rounded">
          <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
        </Button>
      </Animated.View>
    </KeyBoardAvoidingViewLayout>
  );
}
