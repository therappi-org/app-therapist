import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressBar } from '@/components/ProgressBar';

const nameAccountSchema = z
  .object({
    name: z.string().min(3, 'Nome muito curto').trim(),
  })
  .required();

type NameAccountFormValues = z.infer<typeof nameAccountSchema>;

export default function NameAccount() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<NameAccountFormValues>({
    mode: 'all',
    resolver: zodResolver(nameAccountSchema),
  });

  const name = watch('name');

  return (
    <View className="flex-1 bg-brand">
      <View className="mt-4 space-y-4 px-6">
        <ProgressBar progress={50} />
        <Text className="font-MontserratSemiBold text-base text-white">
          1º Passo - Seus dados básicos
        </Text>
      </View>

      <View className="relative mt-8 flex-1 items-center rounded-t-2xl bg-white px-2">
        <View className="mt-6 flex-1 items-center space-y-4">
          <Text className="font-MontserratBold text-lg">Qual é o seu nome e sobrenome?</Text>
          <Input
            control={control}
            name="name"
            placeholder="Digite seu nome"
            isValid={isValid}
            variant="unstyled"
            autoCapitalize="words"
            error={errors.name?.message}
          />
        </View>

        <View className="absolute bottom-20 right-6">
          <Link asChild href={`/(auth)/create-account/account-email/${name}`}>
            <Button disabled={!isValid} variant="rounded">
              <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}
