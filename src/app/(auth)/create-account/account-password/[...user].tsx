import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressBar } from '@/components/ProgressBar';

const passwordAccountSchema = z
  .object({
    password: z.string().trim().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
  })
  .required();

type PasswordAccountFormValues = z.infer<typeof passwordAccountSchema>;

export default function PasswordAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeAreaInsets();
  const { user } = useSearchParams<{ user: string[] }>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PasswordAccountFormValues>({
    mode: 'all',
    resolver: zodResolver(passwordAccountSchema),
  });

  return (
    <View className="flex-1 bg-brand">
      <View className="mt-4 space-y-4 px-6">
        <ProgressBar progress={100} />
        <Text className="font-MontserratSemiBold text-base text-white">
          3º Passo - Seus dados de acesso
        </Text>
      </View>

      <View className="mt-8 flex-1 items-center rounded-t-2xl bg-white px-2">
        <View className="mt-6 flex-1 items-center space-y-4">
          <Text className="font-MontserratBold text-lg">Vamos criar uma senha de acesso:</Text>
          <Input
            control={control}
            name="password"
            placeholder="Digite sua senha"
            isValid={isValid}
            variant="unstyled"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            error={errors.password?.message}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: insets.bottom + 24,
          }}
          className="w-full items-center px-4">
          <View>
            <Button
              className="w-full"
              onPress={() => setShowPassword((prevState) => !prevState)}
              variant="ghost">
              <Text className="font-MontserratBold text-sm text-brand">
                {showPassword ? 'ocultar senha' : 'mostrar senha'}
              </Text>
            </Button>
          </View>
          <Link asChild href="/(auth)/create-account/feedback">
            <Button disabled={!isValid} variant="rounded">
              <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}