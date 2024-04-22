import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ProgressBar } from '@/components/ProgressBar';
import { useAuth } from '@/contexts/useAuth';
import { useAnimatedKeyboardAwareStyle } from '@/hooks/useAnimatedKeyboardAwareStyle';
import { KeyBoardAvoidingViewLayout } from '@/layout/KeyboardAvoidingViewLayout';
import { UserTherapyQuery } from '@/queries/userTherapy';
import { useTherapyStore } from '@/stories/useTherapyStore';

const sessionDurationSchema = z.object({
  duration: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' })
    .regex(/^[0-9]+$/, { message: 'Valor inválido' }),
});

type sessionDurationFormValues = z.infer<typeof sessionDurationSchema>;

export default function SessionDuration() {
  const { userData } = useAuth();
  const animatedStyle = useAnimatedKeyboardAwareStyle();
  const { selectedTherapy, address, typeOfService, currency } = useTherapyStore((state) => ({
    selectedTherapy: state.selectedTherapy,
    address: state.address,
    typeOfService: state.typeOfService,
    currency: state.currency,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<sessionDurationFormValues>({
    mode: 'all',
    resolver: zodResolver(sessionDurationSchema),
  });

  const { mutate: createTherapy, isLoading } = UserTherapyQuery.CreateTherapy({
    onSuccess() {
      router.push('/(app)/(therapist-register)/session/feedback');
    },
  });

  const onSubmit = async (data: sessionDurationFormValues) => {
    if (userData?.id && selectedTherapy?.id) {
      if (address?.id) {
        createTherapy({
          idUser: userData.id,
          idTherapy: selectedTherapy.id,
          bVirtual: typeOfService.remote,
          bPresential: typeOfService.inPerson,
          sCountry: 'BR',
          nSessionValue: currency,
          nSessionDurationInMinutes: Number(data.duration),
          idUserAddress: address.id,
        });
        return;
      }

      createTherapy({
        idUser: userData.id,
        idTherapy: selectedTherapy.id,
        bVirtual: typeOfService.remote,
        bPresential: typeOfService.inPerson,
        nSessionValue: currency,
        nSessionDurationInMinutes: Number(data.duration),
        idUserAddress: null,
        sCountry: 'BR',
        sState: address?.uf ?? '',
        sCity: address?.localidade ?? '',
        sNeighborhood: address?.bairro ?? '',
        sStreet: address?.logradouro ?? '',
        sZipcode: address?.cep ?? '',
        nBuildNumber: Number(address?.numero ?? ''),
        sComplement: address?.complemento ?? '',
      });
    }
  };

  return (
    <KeyBoardAvoidingViewLayout
      header={
        <View className="mt-4 gap-4 px-6">
          <ProgressBar progress={100} />
          <Text className="font-MontserratSemiBold text-base text-white">
            {selectedTherapy?.name}
          </Text>
        </View>
      }>
      <View className="mt-6 items-center gap-4">
        <Text className="font-MontserratBold text-lg">Qual é a duração da sessão?</Text>
        <Input
          control={control}
          name="duration"
          textAlign="center"
          placeholder="Ex. 60 (em minutos)"
          keyboardType="number-pad"
          isValid={isValid}
          variant="unstyled"
          error={errors.duration?.message}
        />
      </View>

      <Animated.View style={animatedStyle} className="absolute bottom-10 right-4">
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
          isLoading={isLoading}
          variant="rounded">
          <Feather name="arrow-right" size={24} color="#fff" backgroundColor="transparent" />
        </Button>
      </Animated.View>
    </KeyBoardAvoidingViewLayout>
  );
}
