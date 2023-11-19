import { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type KeyBoardAvoidingViewLayoutProps = {
  header: ReactNode;
  children: ReactNode;
};

export const KeyBoardAvoidingViewLayout = ({
  header,
  children,
}: KeyBoardAvoidingViewLayoutProps) => {
  return (
    <View className="flex-1 bg-brand">
      {header}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        className="mt-8 w-full flex-1 items-center rounded-t-2xl bg-white px-2">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="w-full flex-1">{children}</View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
