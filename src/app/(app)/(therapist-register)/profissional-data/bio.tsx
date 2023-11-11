import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressBar } from '@/components/ProgressBar';

const bioSchema = z.object({
  bio: z
    .string()
    .nonempty({ message: 'A bio não pode ser vazia' })
    .max(200, { message: 'A bio não pode ter mais de 200 caracteres' }),
});

type BioFormValues = z.infer<typeof bioSchema>;

export default function Bio() {
  const { name } = useLocalSearchParams<{ name: string }>();

  const {
    control,
    // handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<BioFormValues>({
    mode: 'all',
    resolver: zodResolver(bioSchema),
  });

  const watchBio = watch('bio');

  return (
    <View className="flex-1 bg-brand">
      <View className="mt-4 space-y-4 px-6">
        <ProgressBar progress={40} />
        <Text className="font-MontserratSemiBold text-base text-white">Biografia profissional</Text>
      </View>

      <View className="mt-8 flex-1 items-center rounded-t-2xl bg-white px-2">
        <View className="mt-6 flex-1 items-center space-y-4">
          <Text className="font-MontserratBold text-lg">Breve descrição profissional</Text>
          <Input
            control={control}
            name="bio"
            placeholder="Digite sua bio"
            isValid={isValid}
            multiline
            numberOfLines={4}
            variant="unstyled"
            autoCapitalize="none"
            error={errors.bio?.message}
          />
        </View>

        <View className="absolute bottom-20 right-6">
          <Link asChild href="/(app)/(therapist-register)/profissional-data/therapy">
            <Button disabled={!isValid} variant="rounded">
              <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}
