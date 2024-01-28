import clsx from 'clsx';
import { View, ViewProps } from 'react-native';

interface CardRootProps extends ViewProps {
  children: React.ReactNode;
}

export const CardRoot = ({ children, className, ...props }: CardRootProps) => {
  return (
    <View
      className={clsx(
        'w-full max-w-full flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-sm',
        className
      )}
      {...props}>
      {children}
    </View>
  );
};
