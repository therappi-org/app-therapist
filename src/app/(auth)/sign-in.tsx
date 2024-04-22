import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dimensions,
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
import { useAuth } from '@/contexts/useAuth';
import { useAnimatedKeyboardAwareStyle } from '@/hooks/useAnimatedKeyboardAwareStyle';
import { useKeyboardStatus } from '@/hooks/useKeyboardStatus';
import colors from '@/theme/colors';
import { cn } from '@/utils/lib';

const signInSchema = z.object({
  s_email: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'O email informado não é válido' })
    .trim(),
  s_password: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .trim(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeAreaInsets();
  const { signIn, isAuthLoading } = useAuth();
  const { height } = Dimensions.get('window');
  const keyboardStatus = useKeyboardStatus();
  const isDevicesWithSmallScreen =
    keyboardStatus === 'active' && Platform.OS === 'android' && height < 700;
  const animatedStyle = useAnimatedKeyboardAwareStyle();

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
        <ScrollView
          scrollEnabled={isDevicesWithSmallScreen}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <View
            className="flex-1"
            style={{
              paddingBottom: insets.bottom,
            }}>
            <View className="mt-10 flex-1 gap-10">
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
                  variant="underlined"
                  keyboardType="email-address"
                  error={errors.s_email?.message}
                  autoCapitalize="none"
                  className={cn('px-4', watchFields.s_email && 'border-brand')}
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
                  variant="underlined"
                  autoCapitalize="none"
                  secureTextEntry={!showPassword}
                  keyboardType="default"
                  error={errors.s_password?.message}
                  className={cn('px-4', watchFields.s_password && 'border-brand')}
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

            <Animated.View style={animatedStyle} className="items-center">
              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
                isLoading={isAuthLoading}>
                <Text className="text-bas font-MontserratBold text-white">Avançar</Text>
              </Button>

              <Link href={`/(auth)/forgot-password/${watchFields.s_email}`} asChild>
                <Button variant="ghost" className="w-full max-w-fit">
                  <Text className="w-fit font-MontserratBold text-base text-brand">
                    Esqueci minha senha
                  </Text>
                </Button>
              </Link>
            </Animated.View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
