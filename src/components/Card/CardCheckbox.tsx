import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';

import colors from '@/theme/colors';
import { cn } from '@/utils/lib';

type CardCheckboxProps = React.ComponentProps<typeof Pressable> & {
  isChecked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CardCheckbox = ({ isChecked, setChecked, className, ...props }: CardCheckboxProps) => {
  return (
    <Pressable
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand bg-transparent',
        className
      )}
      onPress={() => setChecked(!isChecked)}
      {...props}>
      {isChecked && <FontAwesome name="circle" size={12} color={colors.brand.DEFAULT} />}
    </Pressable>
  );
};
