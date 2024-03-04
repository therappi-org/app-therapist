import { Link } from 'expo-router';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { useAuth } from '@/contexts/useAuth';
import { UserTherapyQuery } from '@/queries/userTherapy';
import { useTherapyStore } from '@/stories/useTherapyStore';
import { Therapy } from '@/types/therapy';

export default function SelectTherapy() {
  const { userData } = useAuth();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { selectedTherapy, setSelectedTherapy } = useTherapyStore((state) => ({
    selectedTherapy: state.selectedTherapy,
    setSelectedTherapy: state.setSelectedTherapy,
  }));

  const { data: notAttendedTherapyData, isLoading } = UserTherapyQuery.FindNotAttendedTherapy({
    userId: userData?.id,
  });

  const formattedTherapies: Therapy[] | undefined = notAttendedTherapyData
    ?.map((therapy) => {
      return {
        id: therapy.id,
        name: therapy.sName,
        image: therapy.sAvatarUrl,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleOnPressTherapy = (therapy: Therapy) => {
    setSelectedTherapy(therapy);
  };

  return (
    <View className="flex-1 bg-brand" style={{ paddingBottom: insets.bottom }}>
      <View className="mt-4 space-y-4 px-6">
        <ProgressBar progress={70} />
        <Text className="font-MontserratSemiBold text-base text-white">Habilitar serviços</Text>
      </View>

      <View className="mt-6 flex-1">
        <View className="space-y-2">
          <Text className="px-6 font-MontserratBold text-base text-white">
            Escolha a terapia que você deseja habilitar
          </Text>

          <Text className="px-6 font-MontserratSemiBold text-xs text-white">
            Você poderá adicionar mais terapias posteriormente
          </Text>
        </View>

        {isLoading ? (
          <View className="mx-6 mt-4 flex-1">
            <ContentLoader
              speed={1}
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb">
              <Rect x="0" y="0" rx="12" ry="12" width="90%" height="80" />
              <Rect x="0" y="88" rx="12" ry="12" width="90%" height="80" />
              <Rect x="0" y="176" rx="12" ry="12" width="90%" height="80" />
              <Rect x="0" y="264" rx="12" ry="12" width="90%" height="80" />
              <Rect x="0" y="352" rx="12" ry="12" width="90%" height="80" />
            </ContentLoader>
          </View>
        ) : (
          <ScrollView className="mt-4 flex-1 px-6" showsVerticalScrollIndicator={false}>
            {formattedTherapies?.map((therapy) => (
              <View key={therapy.name} className="py-2">
                <Button
                  className={`h-[72px] w-full ${selectedTherapy?.id === therapy.id && 'opacity-70'}`}
                  onPress={() => handleOnPressTherapy(therapy)}>
                  <Card.Root>
                    <Card.Content
                      title={therapy.name}
                      image={{
                        source: therapy.image,
                      }}
                    />
                  </Card.Root>
                </Button>
              </View>
            ))}
          </ScrollView>
        )}

        <View className="mb-4 mt-6 px-6">
          <Link
            asChild
            href="/(app)/(therapist-register)/profissional-data/therapy/feedbackTherapy">
            <Button disabled={!selectedTherapy} className="w-full bg-white">
              <Text className="font-MontserratBold text-base text-brand">Avançar</Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}
