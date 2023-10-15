'expo-router';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';

type Therapy = {
  isChecked: boolean;
  name: string;
  image: any;
};

export default function Bio() {
  const [selectedTherapies, setSelectedTherapies] = useState<Therapy[]>([]);
  const insets = useSafeAreaInsets();

  const therapies = [
    'Terapia 1',
    'Terapia 2',
    'Terapia 3',
    'Terapia 4',
    'Terapia 5',
    'Terapia 6',
    'Terapia 7',
    'Terapia 8',
    'Terapia 9',
  ];

  const formattedTherapies = therapies.map((therapy) => {
    return {
      name: therapy,
      image: require('@/assets/images/therapy-example.svg'),
      isChecked: false,
    };
  });

  const handleOnPressTherapy = (therapy: Therapy) => {
    const hasTherapy = selectedTherapies.some(
      (selectedTherapy) => selectedTherapy.name === therapy.name
    );

    if (hasTherapy) {
      setSelectedTherapies((prevTherapies) => {
        return prevTherapies.filter((prevTherapy) => prevTherapy.name !== therapy.name);
      });
      return;
    }

    setSelectedTherapies((prevTherapies) => {
      return [
        ...prevTherapies,
        {
          ...therapy,
          isChecked: true,
        },
      ];
    });
  };

  return (
    <View className="flex-1 bg-brand" style={{ paddingBottom: insets.bottom }}>
      <View className="mt-4 space-y-4 px-6">
        <ProgressBar progress={40} />
        <Text className="font-MontserratSemiBold text-base text-white">Habilitar serviços</Text>
      </View>

      <View className="mt-8 flex-1">
        <Text className="px-6 font-MontserratBold text-base text-white">
          Marque as terapias que você quer ativar na plataforma:
        </Text>

        <ScrollView className="mt-4 flex-1 px-6" showsVerticalScrollIndicator={false}>
          {formattedTherapies.map((therapy) => (
            <View key={therapy.name} className="py-2">
              <Button className="h-[72px] w-full" onPress={() => handleOnPressTherapy(therapy)}>
                <Card.Root>
                  <Card.Content title={therapy.name} image={therapy.image} />
                  <Card.CheckBox
                    isChecked={selectedTherapies.some(
                      (selectedTherapy) => selectedTherapy.name === therapy.name
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
            href={`/(therapist-register)/profissional-data/therapy/${selectedTherapies.length}`}>
            <Button disabled={!selectedTherapies.length} className="w-full bg-white">
              <Text className="font-MontserratBold text-base text-brand">Avançar</Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}
