import { GenericItem } from "@components/Items/GenericItem"
import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IAddressDTO } from "@dtos/shared/IAddressDTO"
import { useAuth } from "@hooks/useAuth"
import { useNavigation } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useQuery } from "@tanstack/react-query"
import { FlatList, HStack, Text, View, VStack } from "native-base"
import { MapPin, Plus, TrashSimple } from "phosphor-react-native"
import { TouchableOpacity } from "react-native"
import { ListTenantAddressesService } from "src/services/addressService"
import { THEME } from "src/theme"


export function AddressesList() {
  const navigation = useNavigation<TenantNavigatorRoutesProps>();
  const { tenant } = useAuth()
  const tenantId = tenant?.id;

  const { colors } = THEME

  const { data: addresses, isLoading } = useQuery<IAddressDTO[]>({
    queryKey: ['get-addresses', tenantId],
    queryFn: async () => {
      const { data } = await ListTenantAddressesService(tenantId)
      return data.data
    }
  })

  const handleClickCreate = () => {
    navigation.navigate('createAddress')
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
                  <HStack space={4} borderWidth={0.3} borderColor="coolGray.500" borderRadius={7} py={2} px={4} alignItems="center">
                    <MapPin color={colors.coolGray['600']} />
                    <VStack space={1} flex={1}>
                      <Text numberOfLines={1} fontFamily="body" fontSize="md" color="coolGray.800"> Rua {item.street} {item.number ? `, ${item.number}` : ''}</Text>
                      <Text fontFamily="body" color="coolGray.500" mt={2}> CEP {item.zipCode ? `, ${item.zipCode}` : 'Nao informado'}</Text>
                      <Text fontFamily="body" color="coolGray.500"> {item.city}, {<Text> {item.state}</Text>}</Text>
                    </VStack>
                    <TouchableOpacity>
                      <TrashSimple color={colors.red['600']} size={24} />
                    </TouchableOpacity>
                  </HStack>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
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