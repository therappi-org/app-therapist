import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';

export const SkipButton = () => (
  <View className="self-end">
    <Link asChild replace href="/(auth)/intro">
      <Button variant="ghost">
        <Text className="text-center font-MontserratBold text-base text-gray-800">Pular</Text>
      </Button>
    </Link>
  </View>
);
