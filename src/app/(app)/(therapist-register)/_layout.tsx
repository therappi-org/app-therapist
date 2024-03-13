import { useNavigationState } from '@react-navigation/native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '@/components/BackButton';
import { getData } from '@/utils/asyncStoreData';
import { THERAPIST_REGISTERED_KEY } from '@/utils/constants';

const colors = require('@/theme/colors');

export default function Layout() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      try {
        const didRegister = await getData(THERAPIST_REGISTERED_KEY);

        if (didRegister) {
          router.replace('/(app)/(tabs)');
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        className="bg-brand">
        <Stack
          screenOptions={{
            animation: 'slide_from_right',
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: colors.brand.DEFAULT,
            },
            headerTitleStyle: {
              fontFamily: 'Montserrat_600SemiBold',
              fontSize: 18,
            },
            headerLeft: () => <BackButton />,
          }}>
          <Stack.Screen
            options={{
              title: 'Dados pessoais',
            }}
            name="phoneNumber"
          />
          <Stack.Screen
            options={{
              title: 'Dados pessoais',
            }}
            name="date-birth/[phoneNumber]"
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="photo/index"
          />
          <Stack.Screen
            options={{
              title: '',
            }}
            name="photo/addPhoto/index"
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="profissional-data/index"
          />
          <Stack.Screen
            options={{
              title: 'Dados profissionais',
            }}
            name="profissional-data/bio"
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="profissional-data/therapy/index"
          />
          <Stack.Screen
            options={{
              title: 'Dados profissionais',
            }}
            name="profissional-data/therapy/select-therapy"
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="profissional-data/therapy/feedbackTherapy"
          />
          <Stack.Screen
            options={{
              title: 'Dados do local',
            }}
            name="profissional-data/type-service"
          />
          <Stack.Screen
            options={{
              title: 'Dados do local',
            }}
            name="address/cep"
          />
          <Stack.Screen
            options={{
              title: 'Lista de endereços',
              presentation: 'modal',
              headerLeft: () => <BackButton iconName="x" />,
            }}
            name="address/registered-address"
          />
          <Stack.Screen
            options={{
              title: 'Dados do local',
            }}
            name="address/full-address/[cep]"
          />
          <Stack.Screen
            options={{
              title: 'Dados profissionais',
            }}
            name="session/cost"
          />
          <Stack.Screen
            options={{
              title: 'Dados profissionais',
            }}
            name="session/duration"
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="session/feedback"
          />
        </Stack>
      </View>
    </>
  );
}
