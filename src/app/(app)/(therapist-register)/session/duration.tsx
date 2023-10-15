import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressBar } from '@/components/ProgressBar';

const sessionDurationSchema = z.object({
  duration: z
    .string()
    .nonempty('Campo obrigatório')
    .regex(/^[0-9]+$/, { message: 'Valor inválido' })
    .refine(
      (value) => {
        const number = Number(value);
        if (number > 24 || number < 1) {
          return false;
        }

        return number > 0;
      },
      { message: 'Hora inválida' }
    ),
});

type sessionDurationFormValues = z.infer<typeof sessionDurationSchema>;

export default function SessionDuration() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<sessionDurationFormValues>({
    mode: 'all',
    resolver: zodResolver(sessionDurationSchema),
  });

  console.log(watch());

  return (
    <View className="flex-1 bg-brand">
      <View className="mt-4 space-y-4 px-6">
        <ProgressBar progress={40} />
        <Text className="font-MontserratSemiBold text-base text-white">1/4 Psicologia</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        className="mt-8 w-full flex-1 items-center rounded-t-2xl bg-white px-2">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="w-full flex-1">
            <View className="mt-6 items-center space-y-4">
              <Text className="text-center font-MontserratBold text-lg">
                Qual é a duração da sessão?
              </Text>
              <Input
                control={control}
                name="duration"
                placeholder="Ex. 2 horas"
                keyboardType="number-pad"
                isValid={isValid}
                variant="unstyled"
                error={errors.duration?.message}
              />
            </View>

            <View className="absolute bottom-12 right-6">
              <Link asChild href="/(therapist-register)/session/duration">
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
