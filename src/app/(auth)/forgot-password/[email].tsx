import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import colors from '@/theme/colors';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'O email informado não é válido' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const insets = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{ email: string }>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormValues>({
    mode: 'all',
    defaultValues: {
      email: email === 'undefined' ? '' : email,
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const watchEmailField = watch('email');

  const onSubmit = (values: ForgotPasswordFormValues) => {
    console.log(values);
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
          <View className="mt-6 flex-1 space-y-8">
            <Text className="font-MontserratSemiBold text-base">
              Antes de continuarmos, confirme seu email cadastrado:
            </Text>

            <View>
              {watchEmailField && (
                <Text className="px-4 font-MontserratBold text-xs text-gray-600">
                  Email cadastrado
                </Text>
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
              <Button disabled={!isValid}>
                <Text
                  className={`font-MontserratBold text-base ${
                    isValid ? 'text-white' : 'text-gray-400'
                  }`}>
                  Enviar link de recuperação
                </Text>
              </Button>
            </Link>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
