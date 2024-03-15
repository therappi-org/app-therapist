import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/useAuth';
import { UserQuery } from '@/queries/user';
import colors from '@/theme/colors';

export default function AddPhoto() {
  const [profileImage, setProfileImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const { userData } = useAuth();
  const { mutate: updateUserAvatar, isLoading } = UserQuery.UpdateAvatar({
    onSuccess() {
      router.push('/(app)/(therapist-register)/profissional-data');
    },
  });
  const insets = useSafeAreaInsets();
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== ImagePicker.PermissionStatus.GRANTED) {
        return Alert.alert(
          'Permissão de acesso ao álbum',
          'Você precisa permitir o acesso ao álbum para escolher uma foto de perfil',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
            { text: 'Abrir configurações', onPress: () => Linking.openSettings() },
          ]
        );
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadUserAvatar = () => {
    if (!profileImage) return;
    const localUri = profileImage.uri;
    const filename = localUri.split('/').pop();
    const formData = new FormData();

    formData.append('file', {
      uri: localUri,
      name: filename,
      type: profileImage?.mimeType ?? 'image/jpeg',
    } as any);

    updateUserAvatar({
      userId: userData?.id,
      formData,
    });
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
            source={{ uri: profileImage.uri }}
            alt="Imagem de perfil"
            className="m-4 max-h-full max-w-full flex-1 items-center justify-center rounded-xl"
            contentFit="cover"
          />
        ) : (
          <View className="m-4 flex-1 items-center rounded-xl bg-[#E4E6E7] shadow-md">
            <Image
              source={require('../../../../assets/images/blank-profile-picture.svg')}
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
            <Button
              isLoading={isLoading}
              onPress={handleUploadUserAvatar}
              variant="rounded"
              className="bg-feedback-success">
              <Feather name="check" size={24} color="#fff" backgroundColor="transparent" />
            </Button>
            <Text className="font-MontserratBold text-base text-white">Confirmar</Text>
          </View>
        )}
      </View>
    </View>
  );
}
