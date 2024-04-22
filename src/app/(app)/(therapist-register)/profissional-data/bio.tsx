import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressBar } from '@/components/ProgressBar';
import { useAuth } from '@/contexts/useAuth';
import { useAnimatedKeyboardAwareStyle } from '@/hooks/useAnimatedKeyboardAwareStyle';
import { KeyBoardAvoidingViewLayout } from '@/layout/KeyboardAvoidingViewLayout';
import { UserQuery } from '@/queries/user';

const bioSchema = z.object({
  bio: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' })
    .max(200, { message: 'A bio não pode ter mais de 200 caracteres' }),
});

type BioFormValues = z.infer<typeof bioSchema>;

export default function Bio() {
  const { userData } = useAuth();
  const { height } = Dimensions.get('window');
  const isSmallDevice = height <= 700;
  const animatedStyle = useAnimatedKeyboardAwareStyle();
  const { mutate: updateUserData, isLoading } = UserQuery.Update({
    onSuccess: () => {
      router.push('/(app)/(therapist-register)/profissional-data/therapy');
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BioFormValues>({
    mode: 'all',
    resolver: zodResolver(bioSchema),
  });

  const onSubmit = ({ bio }: BioFormValues) => {
    updateUserData({
      userId: userData?.id,
      s_short_bio: bio,
    });
  };

  return (
    <KeyBoardAvoidingViewLayout
      header={
        <View className="mt-4 gap-4 px-6">
          <ProgressBar progress={60} />
          <Text className="font-MontserratSemiBold text-base text-white">
            Biografia profissional
          </Text>
        </View>
      }>
      <ScrollView
        scrollEnabled={isSmallDevice}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View className="mt-6 items-center gap-2">
          <Text className="font-MontserratBold text-lg">Breve descrição profissional</Text>
          <Input
            control={control}
            name="bio"
            textAlign="center"
            placeholder="Digite sua bio"
            isValid={isValid}
            textBreakStrategy="highQuality"
            multiline
            numberOfLines={4}
            variant="unstyled"
            autoCapitalize="none"
            error={errors.bio?.message}
          />
        </View>
      </ScrollView>

      <Animated.View style={animatedStyle} className="absolute bottom-10 right-4">
        <Button
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          disabled={!isValid}
          variant="rounded">
          <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
        </Button>
      </Animated.View>
    </KeyBoardAvoidingViewLayout>
  );
}
