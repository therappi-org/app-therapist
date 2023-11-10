'expo-router';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';

type Services = {
  isChecked: boolean;
  name: string;
  subtitle: string;
  image: any;
};

export default function TypesOfService() {
  const [selectedServices, setSelectedServices] = useState<Services[]>([]);
  const insets = useSafeAreaInsets();

  const services: Services[] = [
    {
      name: 'Atendimento remoto',
      subtitle: 'Através de videoconferências',
      image: require('@/assets/images/computer.svg'),
      isChecked: false,
    },
    {
      name: 'Atendimento domiciliar',
      subtitle: 'Atendimento em casa',
      image: require('@/assets/images/home.svg'),
      isChecked: false,
    },
    {
      name: 'Atendimento presencial',
      subtitle: 'Atendimento em consultório',
      image: require('@/assets/images/clinic.svg'),
      isChecked: false,
    },
  ];

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
        <ProgressBar progress={50} />
        <Text className="font-MontserratSemiBold text-base text-white">Habilitar serviços</Text>
      </View>

      <View className="mt-8 flex-1">
        <Text className="px-6 font-MontserratBold text-base text-white">
          Marque as terapias que você quer ativar na plataforma:
        </Text>

        <ScrollView className="mt-4 flex-1 px-6" showsVerticalScrollIndicator={false}>
          {services.map((service) => (
            <View key={service.name} className="py-2">
              <Button className="h-[72px] w-full" onPress={() => handleOnPressTherapy(service)}>
                <Card.Root>
                  <Card.Content
                    title={service.name}
                    subtitle={service.subtitle}
                    image={service.image}
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

        <View className="mt-6 px-6">
          <Link
            asChild
            href={`/(app)/(therapist-register)/profissional-data/therapy/${selectedServices.length}`}>
            <Button disabled={!selectedServices.length} className="w-full bg-white">
              <Text className="font-MontserratBold text-base text-brand">Avançar</Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}
