import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import colors from '@/theme/colors';

export default function AddPhoto() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View
      className="flex-1 items-center bg-brand"
      style={{
        paddingBottom: insets.bottom,
      }}>
      <View className="w-full flex-1">
        <Text className="mb-5 text-center font-MontserratBold text-base text-white">
          Confirme sua foto de perfil
        </Text>

        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            alt="Imagem de perfil"
            className="m-4 max-h-full max-w-full flex-1 items-center justify-center rounded-xl"
            contentFit="cover"
          />
        ) : (
          <View className="m-4 flex-1 items-center rounded-xl bg-[#E4E6E7] shadow-md">
            <Image
              source={require('@/assets/images/blank-profile-picture.svg')}
              alt="Imagem de perfil"
              className="h-52 w-52 max-w-full flex-1 items-center justify-center"
              contentFit="contain"
            />
          </View>
        )}
      </View>

      <View className="mb-5 w-full flex-row items-center justify-center gap-10 py-5">
        <View className="items-center gap-1">
          <Button onPress={pickImage} variant="rounded" className="bg-white">
            <Feather
              name="camera"
              size={24}
              color={colors.feedback.error}
              backgroundColor="transparent"
            />
          </Button>
          <Text className="font-MontserratBold text-base text-white">Escolher foto</Text>
        </View>
        {!!profileImage && (
          <View className="items-center gap-1">
            <Link asChild href="/(app)/(therapist-register)/profissional-data">
              <Button variant="rounded" className="bg-feedback-success">
                <Feather name="check" size={24} color="#fff" backgroundColor="transparent" />
              </Button>
            </Link>
            <Text className="font-MontserratBold text-base text-white">Confirmar</Text>
          </View>
        )}
      </View>
    </View>
  );
}
