import LottieView from 'lottie-react-native';

export const Loading = () => (
  <LottieView
    source={require('../../assets/animations/loading.json')}
    autoPlay
    loop
    style={{
      width: 150,
      height: 100,
      position: 'absolute',
      bottom: 0,

      alignSelf: 'center',
      transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    }}
  />
);
