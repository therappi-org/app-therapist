import { ReactNode, forwardRef } from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Loading } from '../Loading';

import { cn } from '@/utils/lib';

type ButtonProps = TouchableOpacityProps & {
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'rounded' | 'ghost';
  children: ReactNode;
  isLoading?: boolean;
};

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  (
    { disabled = false, children, variant = 'default', isLoading = false, className, ...props },
    ref
  ) => {
    const defaultClassName = cn(
      variant === 'default' &&
        `w-80 max-w-full items-center bg-brand justify-center rounded-full py-4 ${
          disabled && 'opacity-40'
        } ${isLoading && 'h-14'}`,
      variant === 'outline' &&
        `w-80 max-w-full items-center justify-center rounded-full border border-gray-500 py-4 ${
          disabled && 'opacity-40'
        }`,
      variant === 'rounded' &&
        `h-14 w-14 items-center justify-center rounded-full bg-brand ${
          disabled ? 'opacity-40' : 'bg-brand'
        }`,
      variant === 'ghost' && `max-w-full items-center justify-center rounded-full py-4`,
      className
    );

    const LoadingIcon = () => {
      if (variant === 'rounded') {
        return <ActivityIndicator color="#fff" />;
      }

      return <Loading source={require('../../assets/animations/loading.json')} autoPlay loop />;
    };

    return (
      <TouchableOpacity
        className={defaultClassName}
        ref={ref}
        activeOpacity={0.8}
        disabled={disabled || isLoading}
        {...props}>
        {isLoading ? <LoadingIcon /> : children}
      </TouchableOpacity>
    );
  }
);
