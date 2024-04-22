import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useAnimatedKeyboardAwareStyle } from '@/hooks/useAnimatedKeyboardAwareStyle';
import { UserQuery } from '@/queries/user';
import colors from '@/theme/colors';
import { cn } from '@/utils/lib';

const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'O email informado não é válido' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const insets = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{ email: string }>();
  const animatedStyle = useAnimatedKeyboardAwareStyle();
  const { mutate: forgotPassword, isLoading } = UserQuery.ForgotPassword({
    onSuccess: () => {
      router.push('/(auth)/forgot-password/feedback');
    },
  });

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
    forgotPassword({ s_email: values.email });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white px-4"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View
            className="flex-1"
            style={{
              paddingBottom: insets.bottom,
            }}>
            <View className="mt-6 flex-1 gap-8">
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
                  className={cn('px-4', watchEmailField && 'border-brand')}
                />
              </View>
            </View>

            <Animated.View style={animatedStyle} className="mb-4 items-center">
              <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)} disabled={!isValid}>
                <Text className="font-MontserratBold text-base text-white">
                  Enviar link de recuperação
                </Text>
              </Button>
            </Animated.View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
