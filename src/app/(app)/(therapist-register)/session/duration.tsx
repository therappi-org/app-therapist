import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressBar } from '@/components/ProgressBar';
import { KeyBoardAvoidingViewLayout } from '@/layout/KeyboardAvoidingViewLayout';
import { storeData } from '@/utils/asyncStoreData';
import { THERAPIST_REGISTERED_KEY } from '@/utils/constants';

const sessionDurationSchema = z.object({
  duration: z
    .string()
    .nonempty({ message: 'Campo obrigatório' })
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

  return (
    <KeyBoardAvoidingViewLayout
      header={
        <View className="mt-4 space-y-4 px-6">
          <ProgressBar progress={100} />
          <Text className="font-MontserratSemiBold text-base text-white">1/4 Psicologia</Text>
        </View>
      }>
      <View className="mt-6 items-center space-y-4">
        <Text className="text-center font-MontserratBold text-lg">Qual é a duração da sessão?</Text>
        <Input
          control={control}
          name="duration"
          textAlign="center"
          placeholder="Ex. 2 horas"
          keyboardType="number-pad"
          isValid={isValid}
          variant="unstyled"
          error={errors.duration?.message}
        />
      </View>

      <View className="absolute bottom-12 right-4">
        <Link asChild href="/(app)/(tabs)">
          <Button
            onPress={async () => await storeData(THERAPIST_REGISTERED_KEY, JSON.stringify(true))}
            disabled={!isValid}
            variant="rounded">
            <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
          </Button>
        </Link>
      </View>
    </KeyBoardAvoidingViewLayout>
  );
}
