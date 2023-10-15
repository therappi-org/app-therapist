import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAuth } from '@/contexts/useAuth';
import colors from '@/theme/colors';

const signInSchema = z.object({
  s_email: z.string().email({ message: 'O email informado não é válido' }),
  s_password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignInFormValues>({
    mode: 'all',
    resolver: zodResolver(signInSchema),
  });

  const watchFields = watch();

  const onSubmit = (values: SignInFormValues) => {
    signIn(values);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white px-4"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          className="flex-1"
          style={{
            paddingBottom: insets.bottom,
          }}>
          <View className="mt-10 flex-1 space-y-10">
            <View>
              {watchFields.s_email && (
                <Text className="px-4 font-MontserratBold text-xs text-gray-600">
                  Email cadastrado
                </Text>
              )}
              <Input
                name="s_email"
                control={control}
                placeholderTextColor={colors.gray[500]}
                placeholder="Email cadastrado"
                keyboardType="email-address"
                error={errors.s_email?.message}
                autoCapitalize="none"
                className=" border-b-[1px] border-gray-500 px-4 pb-4 font-MontserratSemiBold text-sm text-gray-600 focus:border-brand"
              />
            </View>

            <View className="relative">
              {watchFields.s_password && (
                <Text className="px-4 font-MontserratBold text-xs text-gray-600">
                  Senha de acesso
                </Text>
              )}
              <Input
                name="s_password"
                control={control}
                placeholderTextColor={colors.gray[500]}
                placeholder="Senha de acesso"
                secureTextEntry={!showPassword}
                error={errors.s_password?.message}
                className="border-b-[1px] border-gray-500 px-4 pb-4 font-MontserratSemiBold text-sm text-gray-600 focus:border-brand"
                inputRightElement={
                  <Button
                    variant="ghost"
                    onPress={() => setShowPassword((prevState) => !prevState)}
                    className="w-full p-2">
                    <Text className="font-MontserratBold text-sm text-brand">
                      {showPassword ? 'ocultar senha' : 'mostrar senha'}
                    </Text>
                  </Button>
                }
              />
            </View>
          </View>

          <View className="mb-4 items-center space-y-4">
            {/* <Link href="/" asChild> */}
            <Button disabled={!isValid}>
              <Text
                className={`font-MontserratBold text-base ${
                  isValid ? 'text-white' : 'text-gray-400'
                }`}>
                Avançar
              </Text>
            </Button>
            {/* </Link> */}

            <Link href={`/(auth)/forgot-password/${watchFields.s_email || 'undefined'}`} asChild>
              <Button variant="ghost">
                <Text className="font-MontserratBold text-base text-brand">
                  Esqueci minha senha
                </Text>
              </Button>
            </Link>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
