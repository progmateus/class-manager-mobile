import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { ClassDayItemSkeleton } from "@components/skeletons/Items/ClassDayItemSkeleton"
import { ClassItemSkeleton } from "@components/skeletons/Items/ClassItemSkeleton"
import { Viewcontainer } from "@components/ViewContainer"
import { IClassDTO } from "@dtos/classes/IClass"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useQuery } from "@tanstack/react-query"
import { Center, FlatList, Text, View, VStack } from "native-base"
import { BookBookmark, GraduationCap, IdentificationBadge, Plus } from "phosphor-react-native"
import { useCallback, useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListClassesService } from "src/services/classesService"


export function ClassesList() {
  const navigation = useNavigation<TenantNavigatorRoutesProps>();
  const { tenant } = useAuth()
  const tenantId = tenant?.id

  const { data: classes, isLoading, refetch } = useQuery<IClassDTO[]>({
    queryKey: ['get-classes', tenantId],
    queryFn: () => {
      return ListClassesService(tenantId).then(({ data }) => {
        /* setClassesDays(data.data) */
        return data.data
      })
    }
  })

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
                data={classes}
                pb={20}
                keyExtractor={classItem => classItem.id}
                renderItem={({ item }) => (
                  <TouchableOpacity key={item.id} onPress={() => handleSelectClass(item.id)}>
                    <GenericItem.Root>
                      <GenericItem.Icon icon={BookBookmark} />
                      <GenericItem.Content title={item.name} caption={item.businessHour} />
                      <GenericItem.InfoSection>
                        <GenericItem.InfoContainer >
                          <GraduationCap size={18} color="#6b7280" />
                          <GenericItem.InfoValue text="128" />
                        </GenericItem.InfoContainer>
                        <GenericItem.InfoContainer >
                          <IdentificationBadge size={18} color="#6b7280" />
                          <GenericItem.InfoValue text="7" />
                        </GenericItem.InfoContainer>
                      </GenericItem.InfoSection>
                    </GenericItem.Root>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
              />
            )
        }
      </Viewcontainer>
    </View>
  )
}