import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import colors from '@/theme/colors';

const signInSchema = z.object({
  email: z.string().email({ message: 'O email informado não é válido' }),
  password: z.string().min(6, { message: 'senha deve ter no mínimo 6 caracteres' }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeAreaInsets();

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
    console.log(values);
  };

  return (
    <View
      className="flex-1 bg-white px-4"
      style={{
        paddingBottom: insets.bottom,
      }}>
      <View className="mt-10 flex-1 space-y-10">
        <View>
          {watchFields.email && (
            <Text className="px-4 font-MontserratBold text-xs text-gray-600">Email cadastrado</Text>
          )}
          <Input
            name="email"
            control={control}
            placeholderTextColor={colors.gray[500]}
            placeholder="Email cadastrado"
            keyboardType="email-address"
            error={errors.email?.message}
            autoCapitalize="none"
            className=" border-b-[1px] border-gray-500 px-4 pb-4 font-MontserratSemiBold text-sm text-gray-600 focus:border-brand"
          />
        </View>

        <View className="relative">
          {watchFields.password && (
            <Text className="px-4 font-MontserratBold text-xs text-gray-600">Senha de acesso</Text>
          )}
          <Input
            name="password"
            control={control}
            placeholderTextColor={colors.gray[500]}
            placeholder="Senha de acesso"
            secureTextEntry={!showPassword}
            error={errors.password?.message}
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
              isValid ? 'text-white' : 'text-feedback-info opacity-40'
            }`}>
            Avançar
          </Text>
        </Button>
        {/* </Link> */}

        <Link href={`/(auth)/forgot-password/${watchFields.email || 'undefined'}`} asChild>
          <Button variant="ghost">
            <Text className="font-MontserratBold text-base text-brand">Esqueci minha senha</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}
