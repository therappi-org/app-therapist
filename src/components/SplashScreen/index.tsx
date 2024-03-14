import { Image } from 'expo-image';
import { View } from 'react-native';

import { Loading } from '../Loading';

export const SplashScreen = () => (
  <View className="flex-1 bg-brand">
    <View className="flex-1 items-center justify-center">
      <Image
        alt="logo therappi profissional"
        source={require('@/assets/images/logo.svg')}
        style={{ width: 40, height: 40 }}
      />
    </View>

    <Loading
      style={{ bottom: 0 }}
      source={require('../../assets/animations/loading.json')}
      autoPlay
      loop
    />
  </View>
);
