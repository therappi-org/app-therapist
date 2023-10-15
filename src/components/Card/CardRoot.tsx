import { View } from 'react-native';

type CardRootProps = {
  children: React.ReactNode;
};

export const CardRoot = ({ children }: CardRootProps) => {
  return (
    <View className="w-full max-w-full flex-row items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
      {children}
    </View>
  );
};
