import { Loading } from "@components/Loading"
import { PageHeader } from "@components/PageHeader"
import { Viewcontainer } from "@components/ViewContainer"
import { IAddressDTO } from "@dtos/shared/IAddressDTO"
import { useAuth } from "@hooks/useAuth"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fireSuccesToast } from "@utils/HelperNotifications"
import { FlatList, HStack, Text, View, VStack } from "native-base"
import { Check, MapPin } from "phosphor-react-native"
import { useCallback, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ListTenantAddressesService, UpdateClassAddressService } from "src/services/addressService"
import { THEME } from "src/theme"


type RouteParamsProps = {
  classId: string;
  addressIdExists: string;
}


export function UpdateClassAddress() {

  const { tenant } = useAuth()
  const navigation = useNavigation<TenantNavigatorRoutesProps>()
  const route = useRoute()
  const queryClient = useQueryClient();

  const { addressIdExists, classId } = route.params as RouteParamsProps;

  const [selectedAddressId, setSelectedAddressId] = useState("")
  const [isActing, setIsActing] = useState(false)


  const { colors } = THEME;

  useFocusEffect(useCallback(() => {
    setSelectedAddressId(addressIdExists)
  }, [classId, addressIdExists]))

  const loadAddresses = async () => {
    try {
      const { data } = await ListTenantAddressesService(tenant.id)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: addresses, isLoading } = useQuery<IAddressDTO[]>({
    queryKey: ['get-addresses', tenant.id],
    queryFn: loadAddresses
  })

  const handleUpdateClassAddress = async () => {

    if (isActing || !selectedAddressId) return;

    setIsActing(true)

    await UpdateClassAddressService(tenant.id, classId, selectedAddressId).then(() => {
      fireSuccesToast("Endereço atualizado")
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
      <PageHeader title="Selecione um endereço" rightIcon={Check} rightAction={handleUpdateClassAddress} />
      <Viewcontainer>
        {
          isLoading ? (<Loading />) : (
            <FlatList
              data={addresses}
              pb={20}
              keyExtractor={addressItem => addressItem.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedAddressId(item.id)} key={item.id}>
                  <HStack space={4} borderWidth={item.id === selectedAddressId ? 0.8 : 0.3} borderColor={item.id === selectedAddressId ? 'brand.500' : 'coolGray.500'} borderRadius={7} py={2} px={4} alignItems="center">
                    <MapPin color={item.id === selectedAddressId ? colors.brand['600'] : colors.coolGray['600']} weight={item.id === selectedAddressId ? 'fill' : 'regular'} />
                    <VStack space={1} flex={1}>
                      <Text numberOfLines={1} fontFamily="body" fontSize="md" color="coolGray.800"> Rua {item.street} {item.number ? `, ${item.number}` : ''}</Text>
                      <Text fontFamily="body" color="coolGray.500" mt={2}> CEP {item.zipCode ? `, ${item.zipCode}` : 'Nao informado'}</Text>
                      <Text fontFamily="body" color="coolGray.500"> {item.city}, {<Text> {item.state}</Text>}</Text>
                    </VStack>
                  </HStack>
                </TouchableOpacity>


              )}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
            />
          )
        }
      </Viewcontainer>
    </View >
  )
}