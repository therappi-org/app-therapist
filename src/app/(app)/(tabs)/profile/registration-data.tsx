import Feather from '@expo/vector-icons/Feather';
import { format } from 'date-fns';
import { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, ActivityIndicator } from 'react-native';
import { formatWithMask, Masks } from 'react-native-mask-input';
import { z } from 'zod';

import { useAuth } from '@/contexts/useAuth';
import { UserQuery } from '@/queries/user';
import colors from '@/theme/colors';
import { User } from '@/types/user';

type UserData = Pick<User, 'sName' | 'sEmail' | 'sCellphone' | 'dBirthDate'>;

const validationSchema = {
  sName: z
    .string({ required_error: 'Campo obrigatório' })
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .trim(),
  dBirthDate: z
    .string({ required_error: 'Campo obrigatório' })
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Data de nascimento inválida' }),
  sEmail: z
    .string({ required_error: 'Campo obrigatório' })
    .email({ message: 'O email informado não é válido' })
    .trim(),
  sCellphone: z
    .string({ required_error: 'Campo obrigatório' })
    .regex(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/, { message: 'Telefone inválido' }),
};

export default function RegistrationData() {
  const { userData } = useAuth();
  const [editingField, setEditingField] = useState<keyof UserData | null>(null);
  const [editedValues, setEditedValues] = useState<UserData>({
    sName: userData?.sName ?? '',
    sEmail: userData?.sEmail ?? '',
    sCellphone: userData?.sCellphone ?? '',
    dBirthDate: format(new Date(userData?.dBirthDate ?? ''), 'dd/MM/yyyy') ?? '',
  });
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof UserData, string>>>(
    {}
  );

  const { mutate: updateUser, isLoading: isUpdatingUser } = UserQuery.Update();

  const phoneMask = Masks.BRL_PHONE;
  const { masked: maskedPhone } = formatWithMask({
    text: userData?.sCellphone ?? '',
    mask: phoneMask,
  });

  const handleEdit = (field: keyof UserData) => {
    setEditingField(field);
  };

  const validateField = (field: keyof UserData, value: string) => {
    try {
      validationSchema[field].parse(value);
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleSave = (field: keyof UserData) => {
    const currentValue = editedValues[field];
    const originalValue = userData?.[field];

    if (currentValue === '' || currentValue === originalValue) {
      setEditingField(null);
      return;
    }

    if (!validateField(field, currentValue)) {
      return;
    }

    const updateData = {
      userId: userData!.id,
      [field]: editedValues[field],
    };

    updateUser(updateData, {
      onSuccess: () => {
        setEditingField(null);
        setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
      },
    });
  };

  return (
    <View className="p-4">
      <View className="rounded-2xl bg-white shadow-custom-light">
        <View className="w-full flex-row items-center justify-between gap-4 p-4">
          <View className="flex-row items-center gap-4">
            <Feather name="user-check" size={24} color={colors.feedback.success} />
            <View className="gap-1">
              <Text className="font-MontserratBold text-base">Dados básicos</Text>
              <Text className="font-MontserratBold text-feedback-success">Atualizado</Text>
            </View>
          </View>
          <Feather name="check-circle" size={24} color={colors.feedback.success} />
        </View>

        <View className="border-b border-gray-200" />

        <View className="p-4">
          <Text className="mb-1 font-MontserratMedium text-gray-500">Nome completo</Text>
          <View className="flex-row items-center justify-between">
            {editingField === 'sName' ? (
              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <TextInput
                    className={`flex-1 rounded-lg border p-2 font-MontserratMedium ${
                      validationErrors.sName ? 'border-feedback-error' : 'border-gray-200'
                    }`}
                    value={editedValues.sName}
                    onChangeText={(text) => {
                      setEditedValues({ ...editedValues, sName: text });
                      validateField('sName', text);
                    }}
                  />
                  <TouchableOpacity onPress={() => handleSave('sName')} disabled={isUpdatingUser}>
                    {isUpdatingUser && editingField === 'sName' ? (
                      <ActivityIndicator size="small" color={colors.feedback.success} />
                    ) : (
                      <Feather name="check" size={16} color={colors.feedback.success} />
                    )}
                  </TouchableOpacity>
                </View>
                {validationErrors.sName && (
                  <Text className="mt-1 font-MontserratMedium text-xs text-feedback-error">
                    {validationErrors.sName}
                  </Text>
                )}
              </View>
            ) : (
              <>
                <Text className="font-MontserratMedium text-base">{userData?.sName}</Text>
                <TouchableOpacity onPress={() => handleEdit('sName')}>
                  <Feather name="edit-2" size={16} color={colors.brand['DEFAULT']} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <View className="border-b border-gray-200" />

        <View className="p-4">
          <Text className="mb-1 font-MontserratMedium text-gray-500">Data de nascimento</Text>
          <View className="flex-row items-center justify-between">
            {editingField === 'dBirthDate' ? (
              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <TextInput
                    className={`flex-1 rounded-lg border p-2 font-MontserratMedium ${
                      validationErrors.dBirthDate ? 'border-feedback-error' : 'border-gray-200'
                    }`}
                    value={editedValues.dBirthDate}
                    onChangeText={(text) => {
                      const { masked } = formatWithMask({
                        text,
                        mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
                      });
                      setEditedValues({ ...editedValues, dBirthDate: masked });
                      validateField('dBirthDate', masked);
                    }}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    onPress={() => handleSave('dBirthDate')}
                    disabled={isUpdatingUser}>
                    {isUpdatingUser && editingField === 'dBirthDate' ? (
                      <ActivityIndicator size="small" color={colors.feedback.success} />
                    ) : (
                      <Feather name="check" size={16} color={colors.feedback.success} />
                    )}
                  </TouchableOpacity>
                </View>
                {validationErrors.dBirthDate && (
                  <Text className="mt-1 font-MontserratMedium text-xs text-feedback-error">
                    {validationErrors.dBirthDate}
                  </Text>
                )}
              </View>
            ) : (
              <>
                <Text className="font-MontserratMedium text-base">
                  {format(new Date(userData?.dBirthDate ?? ''), 'dd/MM/yyyy')}
                </Text>
                <TouchableOpacity onPress={() => handleEdit('dBirthDate')}>
                  <Feather name="edit-2" size={16} color={colors.brand['DEFAULT']} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <View className="border-b border-gray-200" />

        <View className="flex-row items-center justify-between p-4">
          <View className="flex-1">
            <Text className="mb-1 font-MontserratMedium text-gray-500">Email</Text>
            {editingField === 'sEmail' ? (
              <View>
                <View className="flex-row items-center gap-2">
                  <TextInput
                    className={`flex-1 rounded-lg border p-2 font-MontserratMedium ${
                      validationErrors.sEmail ? 'border-feedback-error' : 'border-gray-200'
                    }`}
                    value={editedValues.sEmail}
                    onChangeText={(text) => {
                      setEditedValues({ ...editedValues, sEmail: text });
                      validateField('sEmail', text);
                    }}
                    keyboardType="email-address"
                  />
                  <TouchableOpacity onPress={() => handleSave('sEmail')} disabled={isUpdatingUser}>
                    {isUpdatingUser && editingField === 'sEmail' ? (
                      <ActivityIndicator size="small" color={colors.feedback.success} />
                    ) : (
                      <Feather name="check" size={16} color={colors.feedback.success} />
                    )}
                  </TouchableOpacity>
                </View>
                {validationErrors.sEmail && (
                  <Text className="mt-1 font-MontserratMedium text-xs text-feedback-error">
                    {validationErrors.sEmail}
                  </Text>
                )}
              </View>
            ) : (
              <View className="flex-row items-center justify-between">
                <Text className="font-MontserratMedium text-base">{userData?.sEmail}</Text>
                <TouchableOpacity onPress={() => handleEdit('sEmail')}>
                  <Feather name="edit-2" size={16} color={colors.brand['DEFAULT']} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View className="border-b border-gray-200" />

        <View className="flex-row items-center justify-between p-4">
          <View className="flex-1">
            <Text className="mb-1 font-MontserratMedium text-gray-500">Nº de telefone</Text>
            {editingField === 'sCellphone' ? (
              <View>
                <View className="flex-row items-center gap-2">
                  <TextInput
                    className={`flex-1 rounded-lg border p-2 font-MontserratMedium ${
                      validationErrors.sCellphone ? 'border-feedback-error' : 'border-gray-200'
                    }`}
                    value={editedValues.sCellphone}
                    onChangeText={(text) => {
                      const { masked } = formatWithMask({
                        text,
                        mask: Masks.BRL_PHONE,
                      });
                      setEditedValues({ ...editedValues, sCellphone: masked });
                      validateField('sCellphone', masked);
                    }}
                    keyboardType="phone-pad"
                  />
                  <TouchableOpacity
                    onPress={() => handleSave('sCellphone')}
                    disabled={isUpdatingUser}>
                    {isUpdatingUser && editingField === 'sCellphone' ? (
                      <ActivityIndicator size="small" color={colors.feedback.success} />
                    ) : (
                      <Feather name="check" size={16} color={colors.feedback.success} />
                    )}
                  </TouchableOpacity>
                </View>
                {validationErrors.sCellphone && (
                  <Text className="mt-1 font-MontserratMedium text-xs text-feedback-error">
                    {validationErrors.sCellphone}
                  </Text>
                )}
              </View>
            ) : (
              <View className="flex-row items-center justify-between">
                <Text className="font-MontserratMedium text-base">{maskedPhone}</Text>
                <TouchableOpacity onPress={() => handleEdit('sCellphone')}>
                  <Feather name="edit-2" size={16} color={colors.brand['DEFAULT']} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View className="border-b border-gray-200" />

        <View className="p-4">
          <Text className="mb-1 font-MontserratMedium text-gray-500">Nº do CPF</Text>
          <View className="flex-row items-center justify-between">
            <Text className="font-MontserratMedium text-base">{userData?.sCpf}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
