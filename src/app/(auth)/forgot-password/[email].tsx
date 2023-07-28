import { Link, useSearchParams } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Input } from '@/components/Input';
import colors from '@/theme/colors';

type SignInFormValues = {
  email: string;
  password: string;
};

export default function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const insets = useSafeAreaInsets();
  const { email } = useSearchParams();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email === 'undefined' ? '' : email,
    },
  });

  const watchEmailField = watch('email');

  const onSubmit = (values: SignInFormValues) => {
    console.log(values);
  };

  return (
    <View
      className="flex-1 bg-white px-4"
      style={{
        paddingBottom: insets.bottom,
      }}>
      <View className="mt-6 flex-1 space-y-8">
        <Text className="font-MontserratSemiBold text-base">
          Antes de continuarmos, confirme seu email cadastrado:
        </Text>

        <View>
          {watchEmailField && (
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
      </View>

      <View className="mb-4 items-center">
        <Link href="/(auth)/forgot-password/feedback" asChild>
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
              Enviar link de recuperação
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
