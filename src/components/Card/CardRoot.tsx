import { View, ViewProps } from 'react-native';

import { cn } from '@/utils/lib';

interface CardRootProps extends ViewProps {
  children: React.ReactNode;
}

export const CardRoot = ({ children, className, ...props }: CardRootProps) => {
  return (
    <View
      className={cn(
        'min-h-[88px] w-full max-w-full flex-row items-center justify-between rounded-2xl bg-white p-4 shadow-sm',
        className
      )}
      {...props}>
      {children}
    </View>
  );
};
