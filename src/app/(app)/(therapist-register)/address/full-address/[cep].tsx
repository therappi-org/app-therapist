import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { CardCheckbox } from '@/components/Card/CardCheckbox';
import { Input } from '@/components/Input';
import { ViaCepQueries } from '@/queries/viaCep';
import { useTherapyStore } from '@/stories/useTherapyStore';
import colors from '@/theme/colors';
import { cn } from '@/utils/lib';

const fullAddressSchema = z
  .object({
    street: z
      .string({ required_error: 'Campo obrigatório' })
      .min(1, { message: 'Campo obrigatório' })
      .trim(),
    hasNoHouseNumber: z.boolean(),
    number: z.string().trim(),
    complement: z.string().trim(),
    neighborhood: z
      .string({ required_error: 'Campo obrigatório' })
      .min(1, { message: 'Campo obrigatório' })
      .trim(),
    city: z
      .string({ required_error: 'Campo obrigatório' })
      .min(1, { message: 'Campo obrigatório' })
      .trim(),
    state: z
      .string({ required_error: 'Campo obrigatório' })
      .min(1, { message: 'Campo obrigatório' })
      .trim(),
  })
  .refine((data) => {
    if (!data.hasNoHouseNumber) {
      return data.number.length > 0;
    }
    return true;
  });

type FullAddressFormValues = z.infer<typeof fullAddressSchema>;

export default function FullAddress() {
  const [hasNoHouseNumber, setHasNumber] = useState(false);
  const insets = useSafeAreaInsets();
  const { cep } = useLocalSearchParams<{ cep: string }>();
  const { setAddress, address } = useTherapyStore((state) => ({
    setAddress: state.setAddress,
    address: state.address,
  }));

  const { data: cepData } = ViaCepQueries.GetCepData({
    cep,
  });

  const formValues = () => {
    if (address) {
      return {
        street: address.logradouro ?? '',
        hasNoHouseNumber: false,
        number: address.numero ?? '',
        complement: address.complemento ?? '',
        neighborhood: address.bairro ?? '',
        city: address.localidade ?? '',
        state: address.uf ?? '',
      };
    }

    return {
      street: cepData?.logradouro ?? '',
      hasNoHouseNumber: false,
      number: '',
      complement: '',
      neighborhood: cepData?.bairro ?? '',
      city: cepData?.localidade ?? '',
      state: cepData?.uf ?? '',
    };
  };

  const {
    control,
    setValue,
    handleSubmit,
    clearErrors,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<FullAddressFormValues>({
    mode: 'all',
    resolver: zodResolver(fullAddressSchema),
    defaultValues: {
      street: '',
      hasNoHouseNumber: false,
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
    values: formValues(),
  });

  const watchFields = watch();

  const onSubmit = (values: FullAddressFormValues) => {
    setAddress({
      ...address,
      cep,
      logradouro: values.street,
      numero: values.number,
      complemento: values.complement,
      bairro: values.neighborhood,
      localidade: values.city,
      uf: values.state,
    });

    router.push('/(app)/(therapist-register)/session/cost');
  };

  useEffect(() => {
    return () => {
      setAddress(null);
    };
  }, []);

  return (
    <View
      className="flex-1 bg-white px-4"
      style={{
        paddingBottom: insets.bottom,
      }}>
      <Text className="mt-6 font-MontserratSemiBold text-base text-gray-700">
        Informe o endereço completo
      </Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="mb-auto mt-10 flex-1 gap-10">
              <View>
                {watchFields.street && (
                  <Text className="px-2 font-MontserratBold text-xs text-gray-600">
                    Avenida, Rua, Logradouro
                  </Text>
                )}
                <Input
                  name="street"
                  control={control}
                  placeholderTextColor={colors.gray[500]}
                  placeholder="Avenida, Rua, Logradouro"
                  variant="underlined"
                  keyboardType="default"
                  error={errors.street?.message}
                  autoCapitalize="none"
                  className={cn(watchFields.street && 'border-brand')}
                />
              </View>
              <View className="w-full flex-row gap-2">
                <View>
                  {watchFields.number && (
                    <Text className="px-2 font-MontserratBold text-xs text-gray-600">
                      Nº do endereço
                    </Text>
                  )}
                  <Input
                    name="number"
                    editable={!hasNoHouseNumber}
                    selectTextOnFocus={!hasNoHouseNumber}
                    control={control}
                    placeholderTextColor={colors.gray[500]}
                    placeholder="Nº do endereço"
                    variant="underlined"
                    keyboardType="default"
                    error={errors.number?.message}
                    autoCapitalize="none"
                    className={cn(
                      'mr-10 w-full max-w-[144px]',
                      watchFields.number && 'border-brand'
                    )}
                  />
                </View>
                <View className="flex-row items-center gap-2">
                  <CardCheckbox
                    isChecked={hasNoHouseNumber}
                    setChecked={(value) => {
                      setHasNumber(value);
                      setValue('hasNoHouseNumber', !!value);
                      if (value) {
                        clearErrors('number');
                        setValue('number', '');
                      }
                      trigger('hasNoHouseNumber');
                    }}
                  />
                  <Text>Sem número</Text>
                </View>
              </View>
              <View>
                {watchFields.complement && (
                  <Text className="px-2 font-MontserratBold text-xs text-gray-600">
                    Complemento
                  </Text>
                )}
                <Input
                  name="complement"
                  control={control}
                  placeholderTextColor={colors.gray[500]}
                  placeholder="Complemento"
                  variant="underlined"
                  keyboardType="default"
                  error={errors.complement?.message}
                  autoCapitalize="none"
                  className={cn(watchFields.complement && 'border-brand')}
                />
              </View>
              <View>
                {watchFields.neighborhood && (
                  <Text className="px-2 font-MontserratBold text-xs text-gray-600">Bairro</Text>
                )}
                <Input
                  name="neighborhood"
                  control={control}
                  placeholderTextColor={colors.gray[500]}
                  placeholder="Bairro"
                  variant="underlined"
                  keyboardType="default"
                  error={errors.neighborhood?.message}
                  className={cn(watchFields.neighborhood && 'border-brand')}
                />
              </View>
              <View>
                {watchFields.city && (
                  <Text className="px-2 font-MontserratBold text-xs text-gray-600">Cidade</Text>
                )}
                <Input
                  name="city"
                  control={control}
                  placeholderTextColor={colors.gray[500]}
                  placeholder="Cidade"
                  variant="underlined"
                  keyboardType="default"
                  error={errors.city?.message}
                  autoCapitalize="words"
                  className={cn(watchFields.city && 'border-brand')}
                />
              </View>
              <View>
                {watchFields.state && (
                  <Text className="px-2 font-MontserratBold text-xs text-gray-600">Estado</Text>
                )}
                <Input
                  name="state"
                  control={control}
                  placeholderTextColor={colors.gray[500]}
                  placeholder="Estado"
                  variant="underlined"
                  keyboardType="default"
                  error={errors.state?.message}
                  autoCapitalize="words"
                  className={cn(watchFields.state && 'border-brand')}
                />
              </View>
            </View>

            <View className="my-9 flex-1 items-center">
              <Button onPress={handleSubmit(onSubmit)} disabled={!isValid}>
                <Text className="font-MontserratBold text-base text-white">Avançar</Text>
              </Button>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
