import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';
import { StyleProp, ViewStyle } from 'react-native';

export const Loading = ({ style, ...props }: AnimatedLottieViewProps) => {
  const LoadingStyles: StyleProp<ViewStyle> = {
    width: 150,
    height: 100,
    position: 'absolute',
    alignSelf: 'center',
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    ...(typeof style === 'object' && style !== null ? style : {}),
  };

  return <LottieView style={LoadingStyles} {...props} />;
};
