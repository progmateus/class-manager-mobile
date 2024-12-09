import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { UserItem } from "@components/Users/UserItem"
import { Viewcontainer } from "@components/ViewContainer"
import { IStudentClassDTO } from "@dtos/classes/IStudentClassDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fireInfoToast } from "@utils/HelperNotifications"
import { Actionsheet, Box, Button, FlatList, Heading, Icon, Text, View } from "native-base"
import { Plus, TrashSimple } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity, Vibration } from "react-native"
import { ListStudentsByClassService, RemoveStudentFromClassService } from "src/services/classesService"

type RouteParamsProps = {
  tenantIdParams: string;
  classId: string;
}

export function StudentsClassList() {
  const route = useRoute()
  const { tenantIdParams, classId } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams

  const navigation = useNavigation<TenantNavigatorRoutesProps>();
  const queryClient = useQueryClient();

  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<IStudentClassDTO[]>({
    queryKey: ['get-students-classes', tenantId, classId],
    queryFn: ({ pageParam }) => {
      return ListStudentsByClassService(tenantId, classId, { page: Number(pageParam) }).then(({ data }) => {
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

  const handleClickPlus = () => {
    navigation.navigate('addUserToClass', {
      classId,
      roleName: "student"
    })
  }

  const handleRemveStudentFromClass = async (studentClassId: string) => {
    try {
      await RemoveStudentFromClassService(tenantId, studentClassId, classId)
      fireInfoToast('Aluno removido com sucesso')
      queryClient.invalidateQueries({
        queryKey: ['get-students-classes', tenantId, classId]
      })
      queryClient.invalidateQueries({
        queryKey: ['get-class-profile', tenantId, classId]
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View flex={1}>
      <PageHeader title="Gerenciar alunos" rightIcon={tenantId ? Plus : null} rightAction={handleClickPlus} />
      <Viewcontainer>
        {
          isLoading ? (
            <Loading />
          ) : (
            <>
              <FlatList
                data={results?.pages.map(page => page).flat()}
                pb={20}
                keyExtractor={student => student.id}
                renderItem={({ item }) => (<>
                  <UserItem.Root key={item.id}>
                    <UserItem.Avatar url={item.user?.avatar ?? ""} alt="Foto de perfil do aluno " />
                    <UserItem.Content>
                      <UserItem.Title title={`${item.user?.firstName} ${item.user?.lastName}`} />
                      <UserItem.Caption caption={`@${item.user?.username}`} />
                    </UserItem.Content>
                    <UserItem.Section>
                      <Button bg="red.500" size="xs" px={4} onPress={() => handleRemveStudentFromClass(item.id)}>
                        Remover
                      </Button>
                    </UserItem.Section>
                  </UserItem.Root>
                </>

                )}
                ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
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
              >
              </FlatList>
            </>
          )
        }

      </Viewcontainer>
    </View>
  )
}