import { Feather } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/useAuth';
import { UserQuery } from '@/queries/user';
import colors from '@/theme/colors';
import { storeData } from '@/utils/asyncStoreData';
import { HOURS_ATTENDED, THERAPIST_REGISTERED_KEY, WEEK_DAYS } from '@/utils/constants';
import { hexToRGBA } from '@/utils/hexToRgba';
import { cn } from '@/utils/lib';

type HourButtonProps = {
  hour: string;
  index: number;
  attendanceTime: string;
  color?: string;
  setAttendanceTime: React.Dispatch<React.SetStateAction<string>>;
};

type SwitchButtonProps = {
  title: string;
  description: string;
  isEnabled: boolean;
  setIsEnabled: (value: React.SetStateAction<boolean>) => void;
};

const weekend = ['SATURDAY', 'SUNDAY'] as const;

const HourButton = ({
  hour,
  index,
  attendanceTime,
  setAttendanceTime,
  color = 'bg-brand',
}: HourButtonProps) => {
  return (
    <Button
      onPress={() => setAttendanceTime(hour)}
      className={cn(
        'mt-4 h-16 w-[86px] rounded-2xl bg-white',
        index !== 0 && 'ml-3',
        hour === attendanceTime && color
      )}>
      <View className="w-full items-center justify-between">
        <Text
          className={cn(
            'font-MontserratBold text-lg text-gray-600',
            hour === attendanceTime && 'text-white'
          )}>
          {hour}
        </Text>
      </View>
    </Button>
  );
};

const SwitchButton = ({ title, description, isEnabled, setIsEnabled }: SwitchButtonProps) => {
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <Button onPress={toggleSwitch} className="h-[72px] w-full rounded-2xl bg-white">
      <View className="w-full flex-row items-center justify-between px-6">
        <View>
          <Text className="font-MontserratBold text-base text-gray-600">{title}</Text>
          <Text className="font-MontserratSemiBold text-xs text-gray-600">{description}</Text>
        </View>
        <Switch
          className="scale-75"
          trackColor={{
            false: hexToRGBA(colors.gray['500'], 0.1),
            true: hexToRGBA(colors.brand[200], 0.2),
          }}
          thumbColor={isEnabled ? colors.brand[200] : colors.gray['500']}
          ios_backgroundColor={hexToRGBA(colors.gray['500'], 0.1)}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </Button>
  );
};

export default function Attendance() {
  const [attendanceStartTime, setAttendanceStartTime] = useState('');
  const [attendanceEndTime, setAttendanceEndTime] = useState('');
  const [attendanceInterval, setAttendanceInterval] = useState<string[]>([]);
  const [isWeekend, setIsWeekend] = useState(false);
  const [weekendAttendance, setWeekendAttendance] = useState<string[]>([]);
  const [isHoliday, setIsHoliday] = useState(false);
  const [hasInterval, setHasInterval] = useState(false);
  const [scrollPositionStartTime, setScrollPositionStartTime] = useState(0);
  const [scrollPositionEndTime, setScrollPositionEndTime] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const scrollViewRefAttendanceStartTime = useRef<ScrollView>(null);
  const scrollViewRefAttendanceEndTime = useRef<ScrollView>(null);
  const { userData } = useAuth();

  const { mutate: updateWorkingDays, isLoading: isUpdatingWorkingDays } =
    UserQuery.UpdateWorkingDays({
      idUser: userData!.id,
      onSuccess: async () => {
        router.replace('/(app)/(tabs)');
        await storeData(THERAPIST_REGISTERED_KEY, JSON.stringify(true));
        handleDismissModal();
      },
    });

  const getAttendanceMessage = () => {
    if (isWeekend && isHoliday) {
      if (weekendAttendance.length === 1) {
        return `Feriado e ${weekendAttendance[0]}`;
      }
      return `Feriado, ${weekendAttendance.join(' e ')}`;
    }
    if (isWeekend) {
      return weekendAttendance.join(' e ');
    }
    if (isHoliday) {
      return 'Feriado';
    }

    return 'Sem atendimentos';
  };

  const onScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    setScrollPosition: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const offset = event.nativeEvent.contentOffset.x;

    setScrollPosition(offset);
  };

  const scrollLeft = (scrollViewRef: React.RefObject<ScrollView>, scrollPosition: number) => {
    scrollViewRef.current?.scrollTo({ x: scrollPosition - 280, animated: true });
  };

  const scrollRight = (scrollViewRef: React.RefObject<ScrollView>, scrollPosition: number) => {
    scrollViewRef.current?.scrollTo({ x: scrollPosition + 280, animated: true });
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSaveSchedule = () => {
    let days = [];

    const weekdays = Object.entries(WEEK_DAYS).filter(
      ([day]) => !weekend.includes(day as (typeof weekend)[number])
    );
    days = weekdays.map(([_, index]) => ({
      nWeekDay: index,
      dStartTime: attendanceStartTime,
      dStopTime: attendanceEndTime,
    }));

    if (isWeekend) {
      const weekendDays = Object.entries(WEEK_DAYS).filter(([day]) =>
        weekend.includes(day as (typeof weekend)[number])
      );
      let selectedWeekendDays = weekendDays;

      if (weekendAttendance.length > 0) {
        selectedWeekendDays = weekendDays.filter(([day]) => weekendAttendance.includes(day));
      }

      const weekendWorkingDays = selectedWeekendDays.map(([day, index]) => ({
        nWeekDay: index,
        dStartTime: attendanceStartTime,
        dStopTime: attendanceEndTime,
      }));

      days = [...days, ...weekendWorkingDays];
    }

    updateWorkingDays({
      idUser: userData!.id,
      days,
    });
  };

  return (
    <BottomSheetModalProvider>
      <View
        style={{
          flex: 1,
          paddingBottom: insets.bottom,
          backgroundColor: colors.gray[100],
        }}>
        <StatusBar style="dark" />
        <ScrollView showsVerticalScrollIndicator={false} className="mx-6 flex-1 bg-gray-100">
          <Button className="mt-4 h-14 w-full rounded-2xl bg-white">
            <View className="w-full flex-row items-center justify-between px-6">
              <Text className="font-MontserratBold text-sm text-gray-600">
                Agenda com horário único
              </Text>
              <Feather
                name="chevron-down"
                size={24}
                color={colors.brand['DEFAULT']}
                backgroundColor="transparent"
              />
            </View>
          </Button>

          <View className="mt-6">
            <View className="flex-row items-center justify-between">
              <Text className="font-MontserratBold text-base text-gray-600">
                Início do atendimento
              </Text>

              <View className="flex-row items-center gap-4">
                <Button
                  onPress={() =>
                    scrollLeft(scrollViewRefAttendanceStartTime, scrollPositionStartTime)
                  }
                  className="h-8 w-8 bg-white"
                  variant="rounded">
                  <Feather
                    name="chevron-left"
                    size={19}
                    color={colors.brand['DEFAULT']}
                    backgroundColor="transparent"
                  />
                </Button>

                <Button
                  onPress={() =>
                    scrollRight(scrollViewRefAttendanceStartTime, scrollPositionStartTime)
                  }
                  className="h-8 w-8 bg-white"
                  variant="rounded">
                  <Feather
                    name="chevron-right"
                    size={19}
                    color={colors.brand['DEFAULT']}
                    backgroundColor="transparent"
                  />
                </Button>
              </View>
            </View>

            <ScrollView
              ref={scrollViewRefAttendanceStartTime}
              onScroll={(event) => onScroll(event, setScrollPositionStartTime)}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              horizontal
              className="mt-4">
              {HOURS_ATTENDED.map((hour, index) => (
                <HourButton
                  key={hour}
                  hour={hour}
                  index={index}
                  attendanceTime={attendanceStartTime}
                  setAttendanceTime={setAttendanceStartTime}
                />
              ))}
            </ScrollView>
          </View>

          <View className="mt-6">
            <View className="flex-row items-center justify-between">
              <Text className="font-MontserratBold text-base text-gray-600">
                Fim do atendimento
              </Text>

              <View className="flex-row items-center gap-4">
                <Button
                  onPress={() => scrollLeft(scrollViewRefAttendanceEndTime, scrollPositionEndTime)}
                  className="h-8 w-8 bg-white"
                  variant="rounded">
                  <Feather
                    name="chevron-left"
                    size={19}
                    color={colors.brand['DEFAULT']}
                    backgroundColor="transparent"
                  />
                </Button>

                <Button
                  onPress={() => scrollRight(scrollViewRefAttendanceEndTime, scrollPositionEndTime)}
                  className="h-8 w-8 bg-white"
                  variant="rounded">
                  <Feather
                    name="chevron-right"
                    size={19}
                    color={colors.brand['DEFAULT']}
                    backgroundColor="transparent"
                  />
                </Button>
              </View>
            </View>

            <ScrollView
              ref={scrollViewRefAttendanceEndTime}
              onScroll={(event) => onScroll(event, setScrollPositionEndTime)}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              horizontal
              className="mt-4">
              {HOURS_ATTENDED.map((hour, index) => (
                <HourButton
                  key={hour}
                  hour={hour}
                  index={index}
                  attendanceTime={attendanceEndTime}
                  setAttendanceTime={setAttendanceEndTime}
                />
              ))}
            </ScrollView>

            <View className="mt-9 gap-4">
              <View>
                <SwitchButton
                  title="Finais de semana"
                  description={isWeekend ? 'Aceitar atendimentos' : 'Não aceitar atendimentos'}
                  isEnabled={isWeekend}
                  setIsEnabled={setIsWeekend}
                />

                {isWeekend && (
                  <View className="flex-row">
                    {weekend.map((day, index) => (
                      <Button
                        key={day}
                        onPress={() => {
                          if (weekendAttendance.includes(day)) {
                            setWeekendAttendance(weekendAttendance.filter((item) => item !== day));
                            return;
                          }
                          setWeekendAttendance([...weekendAttendance, day]);
                        }}
                        className={cn(
                          'mt-4 h-16 w-[86px] rounded-2xl bg-white',
                          index !== 0 && 'ml-3',
                          weekendAttendance.includes(day) && 'bg-brand'
                        )}>
                        <View className="w-full items-center justify-between">
                          <Text
                            className={cn(
                              'font-MontserratBold text-lg text-gray-600',
                              weekendAttendance.includes(day) && 'text-white'
                            )}>
                            {day === 'SATURDAY' ? 'Sábado' : 'Domingo'}
                          </Text>
                        </View>
                      </Button>
                    ))}
                  </View>
                )}
              </View>
              {/* <SwitchButton
                  title="Feriados"
                  description={isHoliday ? 'Aceitar atendimentos' : 'Não aceitar atendimentos'}
                  isEnabled={isHoliday}
                  setIsEnabled={setIsHoliday}
                /> */}
              {/* <SwitchButton
                  title="Horários de intervalo"
                  description="Adicione pausas no dia"
                  isEnabled={hasInterval}
                  setIsEnabled={(value) => {
                    setHasInterval(value);
                    if (value) setAttendanceInterval([]);
                  }}
                /> */}
            </View>

            {hasInterval && (
              <ScrollView showsHorizontalScrollIndicator={false} horizontal className="mb-12 mt-4">
                {HOURS_ATTENDED.map((hour, index) => (
                  <Button
                    key={hour}
                    onPress={() => {
                      if (attendanceInterval.includes(hour)) {
                        setAttendanceInterval(attendanceInterval.filter((item) => item !== hour));
                        return;
                      }
                      setAttendanceInterval([...attendanceInterval, hour]);
                    }}
                    className={cn(
                      'mt-4 h-16 w-[86px] rounded-2xl bg-white',
                      index !== 0 && 'ml-3',
                      attendanceInterval.includes(hour) && 'bg-feedback-error'
                    )}>
                    <View className="w-full items-center justify-between">
                      <Text
                        className={cn(
                          'font-MontserratBold text-lg text-gray-600',
                          attendanceInterval.includes(hour) && 'text-white'
                        )}>
                        {hour}
                      </Text>
                    </View>
                  </Button>
                ))}
              </ScrollView>
            )}
          </View>
        </ScrollView>
        <View className={cn('top-auto mx-6 mb-2', !hasInterval && 'mt-10')}>
          <Button
            className="w-full"
            onPress={handlePresentModalPress}
            disabled={!attendanceStartTime || !attendanceEndTime}>
            <Text className="font-MontserratBold text-base text-gray-50">Revisar agenda</Text>
          </Button>
        </View>
      </View>

      <BottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        title="Revisar atendimentos"
        snapPointsPercentage="80%">
        <View className="mt-12 flex-1 gap-6">
          <View>
            <Text className="font-MontserratMedium text-base">Segunda à sexta-feira</Text>
            <Text className="font-MontserratBold text-base">
              {attendanceStartTime} às {attendanceEndTime}
            </Text>
          </View>

          <View>
            {/* <Text className="font-MontserratMedium text-base">Feriados e finais de semana</Text> */}
            <Text className="font-MontserratMedium text-base">Finais de semana</Text>
            <Text className="font-MontserratBold text-base">{getAttendanceMessage()}</Text>
          </View>

          {/* <View>
            <Text className="font-MontserratMedium text-base">Horários de intervalo</Text>
            <Text className="font-MontserratBold text-base">
              {hasInterval
                ? attendanceInterval.sort()[0] +
                  ' às ' +
                  attendanceInterval.sort()[attendanceInterval.length - 1]
                : 'Sem atendimentos'}
            </Text>
          </View> */}
        </View>

        <View className="flex-1 justify-between">
          <View className="mb-6 px-10">
            <Text className="text-center font-MontserratMedium text-base">
              Caso faça alterações com atendimentos marcados, eles serão cancelados
            </Text>
          </View>
          <View className="mb-2 items-center gap-4">
            <Button
              onPress={handleSaveSchedule}
              className="h-[56px] w-full"
              disabled={isUpdatingWorkingDays}
              isLoading={isUpdatingWorkingDays}>
              <Text className="text-bas font-MontserratBold text-white">Criar atendimento</Text>
            </Button>

            <Button
              variant="outline"
              disabled={isUpdatingWorkingDays}
              onPress={() => {
                bottomSheetModalRef?.current?.dismiss();
              }}
              className="h-[56px] w-full">
              <Text className="font-MontserratBold text-base text-gray-500">
                Voltar para opções
              </Text>
            </Button>
          </View>
        </View>
      </BottomSheet>
    </BottomSheetModalProvider>
  );
}
