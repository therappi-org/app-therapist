import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressBar } from '@/components/ProgressBar';
import { useAnimatedKeyboardAwareStyle } from '@/hooks/useAnimatedKeyboardAwareStyle';
import { KeyBoardAvoidingViewLayout } from '@/layout/KeyboardAvoidingViewLayout';
import { UserQuery } from '@/queries/user';

const passwordAccountSchema = z.object({
  password: z
    .string({ required_error: 'Campo obrigatório' })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .trim(),
});

type PasswordAccountFormValues = z.infer<typeof passwordAccountSchema>;

type User = [name: string, email: string];

export default function PasswordAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useLocalSearchParams<{ user: User }>();
  const [name, email] = user;
  const animatedStyle = useAnimatedKeyboardAwareStyle();

  const { mutate: createUser, isLoading } = UserQuery.Create({
    onSuccess() {
      router.replace('/(auth)/create-account/feedback');
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordAccountFormValues>({
    mode: 'all',
    resolver: zodResolver(passwordAccountSchema),
  });

  const onSubmit = ({ password }: PasswordAccountFormValues) => {
    createUser({
      s_email: email,
      s_password: password,
      s_name: name,
    });
  };

  return (
    <KeyBoardAvoidingViewLayout
      header={
        <View className="mt-4 gap-4 px-6">
          <ProgressBar progress={100} />
          <Text className="font-MontserratSemiBold text-base text-white">
            3º Passo - Seus dados de acesso
          </Text>
        </View>
      }>
      <View className="mt-6 items-center gap-4">
        <Text className="font-MontserratBold text-lg">Vamos criar uma senha de acesso:</Text>
        <Input
          control={control}
          name="password"
          placeholder="Digite sua senha"
          isValid={isValid}
          variant="unstyled"
          textAlign="center"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          error={errors.password?.message}
        />
      </View>

      <Animated.View
        style={animatedStyle}
        className="absolute bottom-10 w-full flex-row items-center justify-between px-4">
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
        <Button
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
          variant="rounded">
          <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
        </Button>
      </Animated.View>
    </KeyBoardAvoidingViewLayout>
  );
}
