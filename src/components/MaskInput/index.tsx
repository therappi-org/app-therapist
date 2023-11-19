import { Text } from 'react-native';
import {
  default as MaskInputRoot,
  MaskInputProps as MaskInputPropsRoot,
} from 'react-native-mask-input';

import colors from '@/theme/colors';

interface MaskInputProps extends MaskInputPropsRoot {
  isValid: boolean;
  error: string | undefined;
}

export const MaskInput = ({ isValid, error, ...props }: MaskInputProps) => {
  return (
    <>
      <MaskInputRoot
        className={` h-10 w-full text-center font-MontserratBold text-lg ${
          isValid ? 'text-brand' : 'text-feedback-error'
        }`}
        textAlign="center"
        cursorColor={error ? colors.feedback.error : colors.brand.DEFAULT}
        {...props}
      />
      {error && (
        <Text className="pt-2 text-center font-MontserratBold text-xs text-feedback-error">
          {error}
        </Text>
      )}
    </>
  );
};
