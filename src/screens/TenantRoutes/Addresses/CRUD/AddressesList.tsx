import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IAddressDTO } from "@dtos/shared/IAddressDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useQuery } from "@tanstack/react-query"
import { FlatList, Text, View } from "native-base"
import { Plus } from "phosphor-react-native"
import { ListTenantAddressesService } from "src/services/addressService"


export function AddressesList() {
  const navigation = useNavigation<TenantNavigatorRoutesProps>();
  const { tenant } = useAuth()
  const tenantId = tenant?.id;

  const { data: addresses, isLoading } = useQuery<IAddressDTO[]>({
    queryKey: ['get-addresses', tenantId],
    queryFn: async () => {
      const { data } = await ListTenantAddressesService(tenantId)
      return data.data
    }
  })

  const handleClickCreate = () => {
    navigation.navigate('createClass')
  }

  return (
    <View flex={1}>
      <PageHeader title="Endereços" rightIcon={Plus} rightAction={handleClickCreate} />
      <Viewcontainer>
        {
          isLoading ? (
            < Loading />
          )
            : (
              <FlatList
                data={addresses}
                pb={20}
                keyExtractor={address => address.id}
                renderItem={({ item }) => (
                  <View />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
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