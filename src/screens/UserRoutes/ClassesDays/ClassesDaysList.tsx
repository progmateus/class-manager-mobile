import { Center, FlatList, HStack, Heading, Text, VStack, View } from "native-base";
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
import { useInfiniteQuery } from "@tanstack/react-query";
import { ListClassDaysService } from "src/services/classDaysService";
import { ICLassDayDTO } from "@dtos/classes/IClassDayDTO";
import { Avatar } from "@components/Avatar/Avatar";
import Animated from "react-native-reanimated";
import { orderBy } from "lodash";
import { ClassDayItemSkeleton } from "@components/skeletons/Items/ClassDayItemSkeleton";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { ClassDayItem } from "@components/Items/ClassDayItem";

const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity)


export function ClassesDaysList() {

  const userNavigation = useNavigation<UserNavigatorRoutesProps>();
  const tenantNavigation = useNavigation<TenantNavigatorRoutesProps>();

  const [selectedWeekDay, setSelectedWeekDay] = useState(dayjs().toDate())
  const { tenant } = useAuth()
  const tenantId = tenant?.id


  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<ICLassDayDTO[]>({
    queryKey: ['get-classes-days', String(selectedWeekDay)],
    queryFn: ({ pageParam }) => {
      return ListClassDaysService(selectedWeekDay, { page: Number(pageParam), search: "", tenantId }).then(({ data }) => {
        return data.data
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam: any) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    }
  })

  function onLoadMore() {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }


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
    userNavigation.navigate('classDayProfile', {
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

  const createClassDay = () => {
    tenantNavigation.navigate('createClassDay')
  }

  return (
    <View flex={1}>
      <PageHeader title="Aulas" rightIcon={tenant.id ? Plus : null} rightIconColor="brand.500" rightAction={() => createClassDay()} />
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
                    data={orderBy(results?.pages.map(page => page).flat(), (obj) => obj.date, ['asc'])}
                    style={{
                      flex: 1,
                      paddingBottom: 20
                    }}
                    refreshing={isLoading}
                    keyExtractor={classDay => classDay.id}
                    renderItem={({ item, index }) => (
                      <ClassDayItem classDay={item} />
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    ListFooterComponent={
                      isFetchingNextPage ? <Loading /> : <></>
                    }
                    onEndReached={onLoadMore}
                    onEndReachedThreshold={0.3}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={
                      <Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>
                    }
                  ></FlatList>
                )
            }
          </View>
        </View>
      </Viewcontainer>
    </View>
  );
}