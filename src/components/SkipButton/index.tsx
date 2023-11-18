import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { storeData } from '@/utils/asyncStoreData';
import { THERAPIST_STORE_WALKTHROUGH_KEY } from '@/utils/constants';

export const SkipButton = () => (
  <View className="self-end">
    <Link asChild replace href="/(app)/(therapist-register)/phoneNumber">
      <Button
        onPress={async () => await storeData(THERAPIST_STORE_WALKTHROUGH_KEY, JSON.stringify(true))}
        variant="ghost">
        <Text className="text-center font-MontserratBold text-base text-gray-800">Pular</Text>
      </Button>
    </Link>
  </View>
);
