import { View } from 'react-native';

export const StepSphere = ({ step }: { step: number }) => (
  <View className="flex-row items-center justify-center gap-1">
    <View className={`h-2 w-2 rounded-full ${step === 1 ? 'bg-brand' : 'bg-gray-200'}`} />
    <View className={`h-2 w-2 rounded-full ${step === 2 ? 'bg-brand' : 'bg-gray-200'}`} />
    <View className={`h-2 w-2 rounded-full ${step === 3 ? 'bg-brand' : 'bg-gray-200'}`} />
    <View className={`h-2 w-2 rounded-full ${step === 4 ? 'bg-brand' : 'bg-gray-200'}`} />
  </View>
);
