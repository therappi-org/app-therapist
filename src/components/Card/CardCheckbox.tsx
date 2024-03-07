import Checkbox from 'expo-checkbox';
import React from 'react';

import colors from '@/theme/colors';
import { cn } from '@/utils/lib';

type CardCheckboxProps = React.ComponentProps<typeof Checkbox> & {
  isChecked?: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CardCheckbox = ({ isChecked, setChecked, className, ...props }: CardCheckboxProps) => {
  return (
    <Checkbox
      value={isChecked}
      className={cn('h-4 w-4 rounded-full', className)}
      color={colors.brand.DEFAULT}
      onValueChange={setChecked}
      {...props}
    />
  );
};
