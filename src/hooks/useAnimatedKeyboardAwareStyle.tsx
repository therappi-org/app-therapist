import { Dimensions, Platform } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useKeyboardStatus } from '../hooks/useKeyboardStatus';

export const useAnimatedKeyboardAwareStyle = () => {
  const { height } = Dimensions.get('window');
  const keyboardStatus = useKeyboardStatus();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(
            keyboardStatus === 'active' && Platform.OS === 'android' && height < 700 ? 100 : 0,
            {
              duration: 200,
            }
          ),
        },
      ],
    };
  }, [keyboardStatus, height]);

  return animatedStyle;
};
