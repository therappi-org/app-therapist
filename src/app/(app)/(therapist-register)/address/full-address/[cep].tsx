import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useState } from 'react';
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
import colors from '@/theme/colors';

const fullAddressSchema = z
  .object({
    street: z.string().trim().nonempty({ message: 'Campo obrigatório' }),
    hasNoHouseNumber: z.boolean(),
    number: z.string().trim(),
    complement: z.string().trim().nonempty({ message: 'Campo obrigatório' }),
    neighborhood: z.string().trim().nonempty({ message: 'Campo obrigatório' }),
    city: z.string().trim().nonempty({ message: 'Campo obrigatório' }),
    state: z.string().trim().nonempty({ message: 'Campo obrigatório' }),
  })
  .refine((data) => (data.hasNoHouseNumber ? true : !!data.number), {
    message: 'Campo obrigatório',
    path: ['number'],
  });

type FullAddressFormValues = z.infer<typeof fullAddressSchema>;

export default function FullAddress() {
  const [hasNoHouseNumber, setHasNumber] = useState(false);
  const insets = useSafeAreaInsets();

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
  });

  const watchFields = watch();

  const onSubmit = (values: FullAddressFormValues) => {
    console.log(values);
  };

  return (
    <View
      className="flex-1 bg-white px-4"
      style={{
        paddingBottom: insets.bottom,
      }}>
      <Text className="mt-6 font-MontserratSemiBold text-base text-gray-700">
        Informe o CEP do seu endereço:
      </Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="mt-10 flex-1 space-y-10">
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
                  keyboardType="default"
                  error={errors.street?.message}
                  autoCapitalize="none"
                  className="border-b-[1px] border-gray-500 px-2 pb-4 font-MontserratSemiBold text-sm text-gray-600 focus:border-brand"
                />
              </View>
              <View className="w-full flex-row">
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
                    keyboardType="default"
                    error={errors.number?.message}
                    autoCapitalize="none"
                    className="mr-10 w-full max-w-[144px] border-b-[1px] border-gray-500 px-2 pb-4 font-MontserratSemiBold text-sm text-gray-600 focus:border-brand"
                  />
                </View>
                <View className="flex-row items-center space-x-2">
                  <CardCheckbox
                    isChecked={hasNoHouseNumber}
                    setChecked={(value) => {
                      setHasNumber(value);
                      setValue('hasNoHouseNumber', !!value);
                      trigger();
                      if (value) {
                        clearErrors('number');
                        setValue('number', '');
                      }
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
                  keyboardType="default"
                  error={errors.complement?.message}
                  autoCapitalize="none"
                  className=" border-b-[1px] border-gray-500 px-2 pb-4 font-MontserratSemiBold text-sm text-gray-600 focus:border-brand"
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
                  keyboardType="default"
                  error={errors.neighborhood?.message}
                  className=" border-b-[1px] border-gray-500 px-2 pb-4 font-MontserratSemiBold text-sm text-gray-600 focus:border-brand"
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
                  keyboardType="default"
                  error={errors.city?.message}
                  autoCapitalize="words"
                  className=" border-b-[1px] border-gray-500 px-2 pb-4 font-MontserratSemiBold text-sm text-gray-600 focus:border-brand"
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
                  keyboardType="default"
                  error={errors.state?.message}
                  autoCapitalize="words"
                  className=" border-b-[1px] border-gray-500 px-2 pb-4 font-MontserratSemiBold text-sm text-gray-600 focus:border-brand"
                />
              </View>
            </View>

            <View className="my-9 items-center">
              <Link href="/(app)/(therapist-register)/session/cost" asChild>
                <Button disabled={!isValid}>
                  <Text className="font-MontserratBold text-base text-white">Avançar</Text>
                </Button>
              </Link>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
