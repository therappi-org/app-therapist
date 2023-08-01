import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
} from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { Button } from '../Button';

type InputProps<T extends FieldValues> = TextInputProps & {
  control: Control<T>;
  name: Path<T>;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<T>>;
  inputRightElement?: React.ReactNode;
  variant?: 'underlined' | 'unstyled';
  isValid?: boolean;
};

export const Input = <T extends FieldValues>({
  name,
  control,
  error,
  inputRightElement,
  variant = 'underlined',
  isValid = true,
  ...props
}: InputProps<T>) => {
  const inputVariants = {
    underlined: ``,
    unstyled: `max-w-full font-MontserratBold text-lg ${
      isValid ? 'text-brand' : 'text-feedback-error'
    }`,
  };

  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View className="relative">
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className={inputVariants[variant]}
                {...props}
              />
              {inputRightElement && (
                <View className="absolute bottom-2 self-end">{inputRightElement}</View>
              )}

              {error && (
                <Text
                  className={`pt-2 font-MontserratBold text-xs text-feedback-error ${
                    variant === 'unstyled' ? 'text-center' : 'text-left'
                  }`}>
                  {error as string}
                </Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};
