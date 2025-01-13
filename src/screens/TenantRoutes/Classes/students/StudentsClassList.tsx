import { Input } from "@components/form/Input"
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
import { debounce } from "lodash"
import { Actionsheet, Box, Button, FlatList, Heading, Icon, Text, View } from "native-base"
import { MagnifyingGlass, Plus, TrashSimple } from "phosphor-react-native"
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

  const [search, setSearch] = useState("")

  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<IStudentClassDTO[]>({
    queryKey: ['get-students-classes', tenantId, classId, search],
    queryFn: ({ pageParam }) => {
      return ListStudentsByClassService(tenantId, classId, { page: Number(pageParam), search }).then(({ data }) => {
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

  useFocusEffect(useCallback(() => {
    refetch()
  }, []))

  const handleClickPlus = () => {
    navigation.navigate('addUserToClass', {
      classId,
      roleName: "student"
    })
  }

  const changeTextDebounced = (text: string) => {
    setSearch(text)
  }

  const onRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['get-students-classes', tenantId, classId, search],
      exact: true
    })
  }

  const changeTextDebouncer = useCallback(debounce(changeTextDebounced, 250), []);

  const handleRemveStudentFromClass = async (studentClassId: string) => {
    try {
      await RemoveStudentFromClassService(tenantId, studentClassId, classId)
      fireInfoToast('Aluno removido com sucesso')
      queryClient.invalidateQueries({
        queryKey: ['get-students-classes']
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
        <View h={20}>
          <Input
            onChangeText={changeTextDebouncer}
            placeholder="Buscar"
            InputLeftElement={<Icon as={MagnifyingGlass} style={{ marginLeft: 8 }} color="coolGray.400" />}
          />
        </View>
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
                      <UserItem.Title title={`${item.user?.name}`} />
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
                refreshing={isLoading}
                onRefresh={onRefresh}
              >
              </FlatList>
            </>
          )
        }

      </Viewcontainer>
    </View>
  )
}