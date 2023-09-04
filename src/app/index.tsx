import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function Home() {
  return (
    <>
      <StatusBar style="light" />
      <View className="flex-1 items-center justify-center">
        <Link replace href="/(therapist-register)/profissional-data/therapy">
          entre aqui
        </Link>
      </View>
    </>
  );
}
