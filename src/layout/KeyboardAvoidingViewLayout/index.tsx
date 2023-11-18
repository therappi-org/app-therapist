import { useHeaderHeight } from '@react-navigation/elements';
import { ReactNode, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export const KeyBoardAvoidingViewLayout = ({ children }: { children: ReactNode }) => {
  const headerHeight = useHeaderHeight();

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setEnabled(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setEnabled(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={enabled}
      keyboardVerticalOffset={headerHeight - 10}
      className="h-full flex-grow">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-brand">{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
