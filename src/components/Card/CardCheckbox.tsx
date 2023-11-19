import Checkbox from 'expo-checkbox';
import React from 'react';

import colors from '@/theme/colors';

type CardCheckboxProps = {
  isChecked?: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CardCheckbox = ({ isChecked, setChecked, ...props }: CardCheckboxProps) => {
  return (
    <Checkbox
      value={isChecked}
      className="h-4 w-4 rounded-full"
      color={colors.brand.DEFAULT}
      onValueChange={setChecked}
      {...props}
    />
  );
};
