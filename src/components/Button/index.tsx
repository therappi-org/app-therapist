import { ReactNode, forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Loading } from '../Loading';

type ButtonProps = TouchableOpacityProps & {
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'rounded' | 'ghost';
  children: ReactNode;
  isLoading?: boolean;
};

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ disabled, children, variant = 'default', isLoading = false, ...props }, ref) => {
    const buttonVariants = {
      default: `w-80 max-w-full items-center justify-center rounded-full ${
        disabled ? 'bg-gray-100' : 'bg-brand'
      } py-4`,
      outline: `w-80 max-w-full items-center justify-center rounded-full border border-brand py-4`,
      rounded: `h-14 w-14 items-center justify-center rounded-full bg-brand ${
        disabled ? 'opacity-40' : 'bg-brand'
      }`,
      ghost: `w-80 max-w-full items-center justify-center rounded-full py-4`,
    };

    return (
      <TouchableOpacity
        className={buttonVariants[variant]}
        ref={ref}
        activeOpacity={0.8}
        disabled={disabled}
        {...props}>
        {isLoading ? (
          <Loading source={require('../../assets/animations/loading.json')} autoPlay loop />
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);
