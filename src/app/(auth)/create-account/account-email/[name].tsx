import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useSearchParams } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressBar } from '@/components/ProgressBar';

const emailAccountSchema = z
  .object({
    email: z.string().email({ message: 'O email informado não é válido' }),
  })
  .required();

type EmailAccountFormValues = z.infer<typeof emailAccountSchema>;

export default function EmailAccount() {
  const { name } = useSearchParams<{ name: string }>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<EmailAccountFormValues>({
    mode: 'all',
    resolver: zodResolver(emailAccountSchema),
  });

  const watchEmail = watch('email');

  return (
    <View className="flex-1 bg-brand">
      <View className="mt-4 space-y-4 px-6">
        <ProgressBar progress={80} />
        <Text className="font-MontserratSemiBold text-base text-white">
          2º Passo - Seus dados de acesso
        </Text>
      </View>

      <View className="mt-8 flex-1 items-center rounded-t-2xl bg-white px-2">
        <View className="mt-6 flex-1 items-center space-y-4">
          <Text className="font-MontserratBold text-lg">Qual é o seu e-mail?</Text>
          <Input
            control={control}
            name="email"
            placeholder="Digite seu e-mail"
            isValid={isValid}
            variant="unstyled"
            autoCapitalize="none"
            error={errors.email?.message}
          />
        </View>

        <View className="absolute bottom-20 right-6">
          <Link asChild href={`/(auth)/create-account/account-password/${name}/${watchEmail}`}>
            <Button disabled={!isValid} variant="rounded">
              <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}
