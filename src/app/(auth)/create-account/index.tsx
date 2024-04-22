import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Dimensions, Keyboard, Platform, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressBar } from '@/components/ProgressBar';
import { useKeyboardStatus } from '@/hooks/useKeyboardStatus';
import { KeyBoardAvoidingViewLayout } from '@/layout/KeyboardAvoidingViewLayout';

const nameAccountSchema = z.object({
  name: z
    .string({ required_error: 'Campo obrigatório' })
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .trim(),
});
type NameAccountFormValues = z.infer<typeof nameAccountSchema>;

export default function NameAccount() {
  const keyboardStatus = useKeyboardStatus();
  const { height } = Dimensions.get('window');
  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<NameAccountFormValues>({
    mode: 'all',
    resolver: zodResolver(nameAccountSchema),
  });
  const name = watch('name');

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(
            keyboardStatus === 'active' && Platform.OS === 'android' && height < 700 ? 100 : 0,
            {
              duration: 200,
            }
          ),
        },
      ],
    };
  }, [keyboardStatus, height]);

  return (
    <KeyBoardAvoidingViewLayout
      header={
        <View className="mt-4 gap-4 px-6">
          <ProgressBar progress={50} />
          <Text className="font-MontserratSemiBold text-base text-white">
            1º Passo - Seus dados básicos
          </Text>
        </View>
      }>
      <View className="mt-6 items-center gap-4">
        <Text className="font-MontserratBold text-lg">Qual é o seu nome e sobrenome?</Text>
        <Input
          control={control}
          name="name"
          textAlign="center"
          placeholder="Digite seu nome"
          isValid={isValid}
          variant="unstyled"
          autoCapitalize="words"
          error={errors.name?.message}
        />
      </View>

      <View className="absolute bottom-12 right-4">
        <Animated.View style={animatedStyle}>
          <Link asChild href={`/(auth)/create-account/account-email/${name}`}>
            <Button onPress={Keyboard.dismiss} disabled={!isValid} variant="rounded">
              <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
            </Button>
          </Link>
        </Animated.View>
      </View>
    </KeyBoardAvoidingViewLayout>
  );
}
