import { View } from 'react-native';

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <View>
      <View className="relative h-2 w-80 rounded-md bg-gray-50/5" />
      <View
        className="absolute h-2 rounded-md bg-gray-50"
        style={{ width: `${progress > 100 ? 100 : progress}%` }}
      />
    </View>
  );
};
