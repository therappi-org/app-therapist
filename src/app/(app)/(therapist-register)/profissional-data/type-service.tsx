'expo-router';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';

type Services = {
  id: string;
  name: string;
  subtitle: string;
  image: any;
};

const services: Services[] = [
  {
    name: 'Atendimento remoto',
    id: 'remote',
    subtitle: 'Através de videoconferências',
    image: require('@/assets/images/computer.png'),
  },
  {
    name: 'Atendimento domiciliar',
    id: 'home',
    subtitle: 'Atendimento em casa',
    image: require('@/assets/images/house.png'),
  },
  {
    name: 'Atendimento presencial',
    id: 'inPerson',
    subtitle: 'Atendimento em consultório',
    image: require('@/assets/images/hospital.png'),
  },
];

export default function TypesOfService() {
  const [selectedServices, setSelectedServices] = useState<Services[]>([]);
  const insets = useSafeAreaInsets();

  const handleRedirect = () => {
    const isHomeOrInPerson = selectedServices.some(
      (service) => service.id === 'home' || service.id === 'inPerson'
    );

    if (isHomeOrInPerson) {
      return '/(app)/(therapist-register)/address/cep';
    }

    return '/(app)/(therapist-register)/session/cost';
  };

  const handleOnPressTherapy = (service: Services) => {
    const hasTherapy = selectedServices.some(
      (selectedService) => selectedService.name === service.name
    );

    if (hasTherapy) {
      setSelectedServices((prevTherapies) => {
        return prevTherapies.filter((prevService) => prevService.name !== service.name);
      });
      return;
    }

    setSelectedServices((prevService) => {
      return [
        ...prevService,
        {
          ...service,
          isChecked: true,
        },
      ];
    });
  };

  return (
    <View className="flex-1 bg-brand" style={{ paddingBottom: insets.bottom }}>
      <View className="mt-4 space-y-4 px-6">
        <ProgressBar progress={80} />
        <Text className="font-MontserratSemiBold text-base text-white">1/4 - Psicologia</Text>
        <Text className="font-MontserratSemiBold text-base text-white">
          Preferências no atendimento
        </Text>
      </View>

      <View className="mt-8 flex-1">
        <Text className="px-6 font-MontserratBold text-base text-white">
          Qual modelo de atendimento é ideal?
        </Text>

        <ScrollView className="mt-4 flex-1 px-6" showsVerticalScrollIndicator={false}>
          {services.map((service) => (
            <View key={service.name} className="my-5 flex-1">
              <Button className="h-[72px] w-full" onPress={() => handleOnPressTherapy(service)}>
                <Card.Root>
                  <Card.Content
                    style={{
                      padding: 16,
                    }}
                    title={service.name}
                    subtitle={service.subtitle}
                    image={{
                      source: service.image,
                      alt: service.name,
                      className: 'h-12 w-12 p-2 bg-gray-100 rounded-full',
                    }}
                  />
                  <Card.CheckBox
                    isChecked={selectedServices.some(
                      (selectedService) => selectedService.name === service.name
                    )}
                  />
                </Card.Root>
              </Button>
            </View>
          ))}
        </ScrollView>

        <View className="mb-4 mt-6 px-6">
          <Link asChild href={handleRedirect()}>
            <Button disabled={!selectedServices.length} className="w-full bg-white">
              <Text className="font-MontserratBold text-base text-brand">Avançar</Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}
