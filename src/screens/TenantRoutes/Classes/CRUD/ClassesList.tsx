import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { ClassItemSkeleton } from "@components/skeletons/Items/ClassItemSkeleton"
import { Viewcontainer } from "@components/ViewContainer"
import { IClassDTO } from "@dtos/classes/IClassDTO"
import { IClassPreviewDTO } from "@dtos/classes/IClassPreviewDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useInfiniteQuery } from "@tanstack/react-query"
import { FlatList, Text, View, VStack } from "native-base"
import { BookBookmark, GraduationCap, IdentificationBadge, Plus } from "phosphor-react-native"
import { useCallback } from "react"
import { TouchableOpacity } from "react-native"
import { ListClassesService } from "src/services/classesService"


export function ClassesList() {
  const navigation = useNavigation<TenantNavigatorRoutesProps>();
  const { tenant } = useAuth()
  const tenantId = tenant?.id;

  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<IClassPreviewDTO[]>({
    queryKey: ['get-classes', tenantId],
    queryFn: ({ pageParam }) => {
      return ListClassesService(tenantId, { page: Number(pageParam), search: "" }).then(({ data }) => {
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

  const handleClickCreate = () => {
    navigation.navigate('createClass')
  }

  const handleSelectClass = (classId: string) => {
    navigation.navigate('classProfile', {
      tenantIdParams: tenantId,
      classId
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Turmas" rightIcon={Plus} rightAction={handleClickCreate} />
      <Viewcontainer>
        {
          isLoading ? (
            <VStack space={3}>
              <ClassItemSkeleton />
              <ClassItemSkeleton />
              <ClassItemSkeleton />
              <ClassItemSkeleton />
              <ClassItemSkeleton />
              <ClassItemSkeleton />
            </VStack>
          )
            : (
              <FlatList
                data={results?.pages.map(page => page).flat()}

                pb={20}
                keyExtractor={classItem => classItem.id}
                renderItem={({ item }) => (
                  <TouchableOpacity key={item.id} onPress={() => handleSelectClass(item.id)}>
                    <GenericItem.Root>
                      <GenericItem.Icon icon={BookBookmark} />
                      <GenericItem.Content title={item.name} caption={item.description} />
                      <GenericItem.InfoSection>
                        <GenericItem.InfoContainer >
                          <GraduationCap size={18} color="#6b7280" />
                          <GenericItem.InfoValue text={String(item.studentsCount)} />
                        </GenericItem.InfoContainer>
                        <GenericItem.InfoContainer >
                          <IdentificationBadge size={18} color="#6b7280" />
                          <GenericItem.InfoValue text={String(item.teachersCount)} />
                        </GenericItem.InfoContainer>
                      </GenericItem.InfoSection>
                    </GenericItem.Root>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
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
              />
            )
        }
      </Viewcontainer>
    </View>
  )
}