import { Input } from "@components/form/Input"
import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { UserItem } from "@components/Users/UserItem"
import { Viewcontainer } from "@components/ViewContainer"
import { IUserClassDTO } from "@dtos/classes/IUserClassDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fireInfoToast } from "@utils/HelperNotifications"
import { debounce } from "lodash"
import { Actionsheet, Box, Button, FlatList, Heading, Icon, Text, View } from "native-base"
import { MagnifyingGlass, Plus, TrashSimple } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity, Vibration } from "react-native"
import { ListTeachersByClassService, RemoveTeacherFromClassService } from "src/services/classesService"

type RouteParamsProps = {
  tenantIdParams: string;
  classId: string;
}

export function TeachersClassList() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")

  const route = useRoute()
  const { tenantIdParams, classId } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams
  const navigation = useNavigation<TenantNavigatorRoutesProps>();

  const queryClient = useQueryClient();

  const loadTeachersClass = async () => {
    try {
      const { data } = await ListTeachersByClassService(tenantId, classId, { search })
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: teachersClass, isLoading } = useQuery<IUserClassDTO[]>({
    queryKey: ['get-teachers-class', tenantId, classId, search],
    queryFn: loadTeachersClass
  })

  const handleClickPlus = () => {
    navigation.navigate('addUserToClass', {
      classId,
      roleName: "teacher"
    })
  }

  const handleRemoveTeacher = async (teacherClassId: string) => {
    try {
      await RemoveTeacherFromClassService(tenantId, teacherClassId, classId)
      fireInfoToast('Professor removido com sucesso!')
      queryClient.invalidateQueries({
        queryKey: ['get-teachers-class']
      })
      queryClient.invalidateQueries({
        queryKey: ['get-class-profile', tenantId, classId]
      })
    } catch (err) {
      console.log(err)
    } finally {
      setIsOpen(false)
    }
  }

  const changeTextDebounced = (text: string) => {
    setSearch(text)
  }

  const onRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['get-teachers-class', tenantId, classId, search]
    })
  }

  const changeTextDebouncer = useCallback(debounce(changeTextDebounced, 250), []);

  return (
    <View flex={1}>
      <PageHeader title="Gerenciar professores" rightIcon={tenantId ? Plus : null} rightAction={handleClickPlus} />
      <Viewcontainer>
        <View h={20}>
          <Input
            onChangeText={changeTextDebouncer}
            placeholder="Buscar"
            InputLeftElement={<Icon as={MagnifyingGlass} style={{ marginLeft: 8 }} color="coolGray.400" />}
          />
        </View>
        {
          isLoading ? (<Loading />) : (
            <>
              <FlatList
                data={teachersClass}
                pb={20}
                keyExtractor={teacherClass => teacherClass.id}
                renderItem={({ item }) => (
                  <UserItem.Root key={item.id} onLongPress={() => handleRemoveTeacher(item.id)}>
                    <UserItem.Avatar url={item.user?.avatar ?? ""} alt="Foto de perfil do aluno " />
                    <UserItem.Content>
                      <UserItem.Title title={`${item.user?.name}`} />
                      <UserItem.Caption caption={`@${item.user?.username}`} />
                    </UserItem.Content>
                    <UserItem.Section>
                      <Button bg="red.500" size="xs" px={4} onPress={() => handleRemoveTeacher(item.id)}>
                        Remover
                      </Button>
                    </UserItem.Section>
                  </UserItem.Root>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
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