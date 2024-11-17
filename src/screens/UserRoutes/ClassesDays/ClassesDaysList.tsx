import ClockSVG from "@assets/clock-outline.svg"
import { Center, FlatList, HStack, Heading, Image, ScrollView, Text, VStack, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { PageHeader } from "@components/PageHeader";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { Clock, Plus } from "phosphor-react-native";
import { useAuth } from "@hooks/useAuth";
import { useCallback, useState } from "react";
import { Loading } from "@components/Loading";
import { Viewcontainer } from "@components/ViewContainer";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { ListClassDaysService } from "src/services/classDaysService";
import { ICLassDayDTO } from "@dtos/classes/IClassDayDTO";
import { Avatar } from "@components/Avatar/Avatar";
import Animated, { SlideInLeft, SlideInRight, SlideOutRight } from "react-native-reanimated";
import { orderBy } from "lodash";
import { ClassDayItemSkeleton } from "@components/skeletons/Items/ClassDayItemSkeleton";

type RouteParamsProps = {
  tenantIdParams?: string;
}

const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity)


export function ClassesDaysList() {

  const navigation = useNavigation<UserNavigatorRoutesProps>();

  const route = useRoute()
  /* const [classesDays, setClassesDays] = useState<ICLassDayDTO[]>([]) */
  const [selectedWeekDay, setSelectedWeekDay] = useState(dayjs().toDate())
  const params = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id || params?.tenantIdParams || null

  const { data: classesDays, isLoading, refetch } = useQuery<ICLassDayDTO[]>({
    queryKey: ['get-class-days', String(selectedWeekDay)],
    queryFn: () => {
      return ListClassDaysService(selectedWeekDay).then(({ data }) => {
        /* setClassesDays(data.data) */
        return data.data
      })
    }
  })

  useFocusEffect(useCallback(() => {
    refetch()
  }, []))


  const weekDays = [
    dayjs().day(0).toDate(),
    dayjs().day(1).toDate(),
    dayjs().day(2).toDate(),
    dayjs().day(3).toDate(),
    dayjs().day(4).toDate(),
    dayjs().day(5).toDate(),
    dayjs().day(6).toDate(),
    dayjs().day(7).toDate()
  ]

  function handleClickClassDay(classDayId: string, tenantId: string) {
    navigation.navigate('classDayProfile', {
      tenantIdParams: tenantId,
      classDayId
    });
  }

  const getDay = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      timeZone: 'America/Sao_Paulo',
    }).format(new Date(date))
  };

  const getWeekDay = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'short',
      timeZone: 'America/Sao_Paulo',
    }).format(new Date(date))
  };

  const getHours = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    }).format(new Date(date))
  };

  const createClassDay = () => {
    if (!tenantId) return

    navigation.navigate('createClassDay', {
      tenantIdParams: tenantId
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Aulas" rightIcon={tenantId ? Plus : null} rightIconColor="brand.500" rightAction={() => createClassDay()} />
      <Viewcontainer>
        <View flex={1}>
          <HStack mt={4}>
            {weekDays && weekDays.length && (
              weekDays.map((date, index) => {
                return (
                  <VStack key={index} flex={1} justifyContent="space-between">
                    <TouchableOpacityAnimated onPress={() => setSelectedWeekDay(date)}>
                      <Center>
                        <Text textTransform="capitalize">
                          {getWeekDay(date).replace('.', '')}
                        </Text>
                        <Text
                          color={dayjs(selectedWeekDay).format('DD/MM/YYYY') === dayjs(date).format('DD/MM/YYYY') ? "brand.500" : "coolGray.700"}
                          fontFamily="heading" mt={2} fontSize="xl">
                          {getDay(date)}
                        </Text>
                        <View
                          mt={2}
                          w="1/3"
                          borderBottomColor={
                            dayjs(selectedWeekDay).format('DD/MM/YYYY') === dayjs(date).format('DD/MM/YYYY') ? "brand.500" : "coolGray.300"
                          }
                          borderBottomWidth={2}
                        />
                      </Center>
                    </TouchableOpacityAnimated>
                  </VStack>
                )
              })
            )}
          </HStack>

          <View flexGrow={1} px={2} mt={12}>
            {
              isLoading ? (
                <VStack space={3}>
                  <ClassDayItemSkeleton />
                  <ClassDayItemSkeleton />
                  <ClassDayItemSkeleton />
                  <ClassDayItemSkeleton />
                </VStack>
              )
                : (
                  <FlatList
                    data={orderBy(classesDays, (obj) => obj.date, ['asc'])}
                    style={{
                      flex: 1,
                      paddingBottom: 20
                    }}
                    refreshing={isLoading}
                    keyExtractor={classDay => classDay.id}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity key={item.id} onPress={() => handleClickClassDay(item.id, item.class.tenantId)}>
                        <HStack p={4} space={6} alignItems="center" borderWidth={0.4} borderColor="coolGray.400" rounded="lg">
                          <VStack space={2} alignItems="center" justifyContent="center">
                            <Clock size={20} style={{
                              marginLeft: 4
                            }} />
                            <Text fontWeight="bold"> {getHours(item.date)}</Text>
                          </VStack>
                          <VStack space={0.5} flex={1}>
                            <Heading fontSize="sm">{item.class?.tenant?.name}</Heading>
                            <Text fontSize="xs" fontWeight="light">{item.class.name}</Text>
                            <Text fontSize="xs" fontWeight="light" color="coolGray.500">Não informado</Text>
                          </VStack>
                          <HStack>
                            {
                              item.bookings && item.bookings.length > 0 && (
                                item.bookings.map((booking, index) => {
                                  return (
                                    index <= 2 && (
                                      <View ml={-5} key={booking.id}>
                                        <Avatar
                                          rounded="md"
                                          key={booking.id}
                                          w={9}
                                          h={9}
                                          alt="image profile"
                                          src={booking.user.avatar}
                                          username={booking.user.username}
                                        />
                                      </View>
                                    )
                                  )
                                })
                              )
                            }
                            {
                              item.bookings && item.bookings.length > 3 && (
                                <View w={9} h={9} backgroundColor="brand.600" rounded="md" ml={-5} alignItems="center" justifyContent="center">
                                  <Text color="coolGray.100" fontSize="xs"> +{item.bookings.length - 3}</Text>
                                </View>
                              )
                            }
                          </HStack>
                        </HStack>
                      </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
                  ></FlatList>
                )
            }
          </View>
        </View>
      </Viewcontainer>
    </View>
  );
}