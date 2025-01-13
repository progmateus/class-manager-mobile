import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IClassDTO } from "@dtos/classes/IClassDTO"
import { IClassPreviewDTO } from "@dtos/classes/IClassPreviewDTO"
import { ITimeTableDTO } from "@dtos/timeTables/ITimeTableDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query"
import { fireSuccesToast } from "@utils/HelperNotifications"
import { FlatList, Text, View } from "native-base"
import { BookBookmark, Check } from "phosphor-react-native"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListClassesService, TransferClassStudentsService } from "src/services/classesService"


type RouteParamsProps = {
  classId: string;
}


export function TransferClassStudents() {

  const { tenant } = useAuth()
  const navigation = useNavigation<TenantNavigatorRoutesProps>()
  const route = useRoute()
  const queryClient = useQueryClient();

  const { classId } = route.params as RouteParamsProps;

  const [selectedNewClassId, setSelectedNewclassId] = useState("")
  const [isActing, setIsActing] = useState(false)


  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<IClassPreviewDTO[]>({
    queryKey: ['get-classes', tenant.id],
    queryFn: ({ pageParam }) => {
      return ListClassesService(tenant.id, { page: Number(pageParam), search: "" }).then(({ data }) => {
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
    if (hasNextPage && !isLoading && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  const handleUpdateClassTimeTable = async () => {
    if (isActing || !selectedNewClassId) return

    setIsActing(true)
    await TransferClassStudentsService(tenant.id, classId, selectedNewClassId).then(() => {
      fireSuccesToast("Alunos transferidos")
      queryClient.invalidateQueries({
        queryKey: ['get-class-profile', tenant.id, classId],
      }).then(() => {
        navigation.navigate('classProfile', { classId: classId, tenantIdParams: tenant.id })
      })
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setIsActing(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Selecione a nova turma" rightIcon={Check} rightAction={handleUpdateClassTimeTable} />
      <Viewcontainer>
        {
          isLoading ? (<Loading />) : (
            <FlatList
              data={results?.pages.map(page => page).flat().filter(x => x.id !== classId)}
              pb={20}
              keyExtractor={classItem => classItem.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedNewclassId(item.id)} key={item.id}>
                  <GenericItem.Root
                    key={item.id}
                    isSelected={item.id === selectedNewClassId}
                  >
                    <GenericItem.Icon icon={BookBookmark} color={item.id === selectedNewClassId ? 'brand.500' : 'coolGray.700'} />
                    <GenericItem.Content title={item.name} caption={item.description} />
                  </GenericItem.Root>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
              ListFooterComponent={
                isFetchingNextPage ? <Loading /> : <></>
              }
              onEndReached={onLoadMore}
              onEndReachedThreshold={0.3}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )
        }
      </Viewcontainer>
    </View >
  )
}