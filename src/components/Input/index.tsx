import clsx from 'clsx';
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
  className,
  ...props
}: InputProps<T>) => {
  const defaultClassName = clsx(
    variant === 'underlined' && ``,
    variant === 'unstyled' &&
      `max-w-full font-MontserratBold text-lg ${isValid ? 'text-brand' : 'text-feedback-error'}`,
    className
  );

  return (
    <View className="w-full">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className={defaultClassName}
                {...props}
              />
              {inputRightElement && <View className="absolute self-end">{inputRightElement}</View>}

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
