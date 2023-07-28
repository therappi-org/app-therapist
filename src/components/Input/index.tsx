import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Text, TextInput, TextInputProps } from 'react-native';

type InputProps<T extends FieldValues> = TextInputProps & {
  control: Control<T>;
  name: Path<T>;
  error?: string;
};

export const Input = <T extends FieldValues>({ name, control, error, ...props }: InputProps<T>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} {...props} />
        )}
      />

      {error && <Text>{error}</Text>}
    </>
  );
};
