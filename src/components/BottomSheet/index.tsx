import { Feather } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import colors from '@/theme/colors';

type BottomSheetProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  title: string;
  children: React.ReactNode;
  snapPointsPercentage?: string;
};

export const BottomSheet = ({
  bottomSheetModalRef,
  title,
  children,
  snapPointsPercentage = '60%',
}: BottomSheetProps) => {
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => [snapPointsPercentage], [snapPointsPercentage]);

  return (
    <BottomSheetModal ref={bottomSheetModalRef} snapPoints={snapPoints}>
      <BottomSheetView className="flex-1 px-4 pt-8">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 font-MontserratBold text-lg text-gray-600">{title}</Text>
          <Button
            variant="rounded"
            className="mr-2 h-10 w-10 bg-gray-100"
            onPress={() => bottomSheetModalRef?.current?.dismiss()}>
            <Feather name="x" size={24} color={colors.brand['DEFAULT']} />
          </Button>
        </View>

        <View style={{ paddingBottom: insets.bottom }} className="flex-1">
          {children}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
