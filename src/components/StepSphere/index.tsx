import { View } from 'react-native';

export const StepSphere = ({ step }: { step: number }) => {
  return (
    <View className="flex-row items-center justify-center">
      {Array.from({ length: 5 }, (_, i) => i++).map((value) => {
        return (
          <View className="mx-[2px]" key={value}>
            {step === value + 1 ? (
              <View className="h-2 w-2 rounded-full bg-brand" />
            ) : (
              <View className="h-2 w-2 rounded-full bg-gray-200" />
            )}
          </View>
        );
      })}
    </View>
  );
};
