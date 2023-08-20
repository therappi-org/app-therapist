import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/Button';

export default function TakePhoto() {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  // if (!permission) {
  //   // Camera permissions are still loading
  //   return <View />;
  // }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet
  //   return (
  //     <View className="flex-1 items-center justify-center">
  //       <Text>We need your permission to show the camera</Text>
  //       <Button onPress={requestPermission}>
  //         <Text>Grant permission</Text>
  //       </Button>
  //     </View>
  //   );
  // }

  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View className="flex-1 justify-center">
      <Camera className="flex-1" type={type}>
        <View className="mb-16 flex-1 flex-row bg-transparent">
          <TouchableOpacity className="flex-1 items-center self-end" onPress={toggleCameraType}>
            <Text className="font-bold text-brand">Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
