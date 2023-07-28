import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Input } from '@/components/Input';
import colors from '@/theme/colors';

type SignInFormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
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
          />

          <View className="absolute bottom-4 right-0">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowPassword((prevState) => !prevState)}>
              <Text className="font-MontserratBold text-sm text-brand">
                {showPassword ? 'ocultar senha' : 'mostrar senha'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="mb-4 items-center space-y-4">
        {/* <Link href="/" asChild> */}
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isDisabled}
          className={`w-80 max-w-full items-center justify-center rounded-full ${
            isDisabled ? 'bg-gray-100' : 'bg-brand'
          } py-4`}>
          <Text
            className={`font-MontserratBold text-base  ${
              isDisabled ? 'text-feedback-info opacity-40' : 'text-gray-50'
            }`}>
            Avançar
          </Text>
        </TouchableOpacity>
        {/* </Link> */}

        <Link href={`/forgot-password/${watchFields.email || 'undefined'}`} asChild>
          <TouchableOpacity
            className=" w-80 max-w-full items-center justify-center rounded-full py-4 "
            activeOpacity={0.8}>
            <Text className="font-MontserratBold text-base text-brand">Esqueci minha senha</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
