import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ToastRoot from 'react-native-root-toast';

type ToastProps = {
  children: React.ReactNode;
};

export const Toast = ({ children }: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 500);

    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);

  return (
    <ToastRoot visible={visible} position={50} shadow={false} animation={false} hideOnPress>
      {children}
    </ToastRoot>
  );
};
