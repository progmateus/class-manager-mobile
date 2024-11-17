import { FlatList, HStack, Heading, Icon, VStack, View } from "native-base";
import Constants from "expo-constants";
import { Input } from "@components/form/Input";
import { TenantItem } from "@components/Items/TenantItem";
import { MagnifyingGlass } from "phosphor-react-native"
import { useNavigation } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useCallback, useState } from "react";
import { ListTenantsService } from "src/services/tenantsService";
import { debounce } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { TenantItemSkeleton } from "@components/skeletons/Items/TenantItemSkeleton";
import { ITenantPreviewDTO } from "@dtos/tenants/ITenantPreviewDTO";

const statusBarHeight = Constants.statusBarHeight;

export function TenantsList() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const navigation = useNavigation<UserNavigatorRoutesProps>();

  const loadTenants = async () => {
    try {
      const { data } = await ListTenantsService(search)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: tenants, isLoading } = useQuery<ITenantPreviewDTO[]>({
    queryKey: ['get-tenants', search],
    queryFn: loadTenants
  })

  function handleSelectTenant(tenantId: string) {
    navigation.navigate('tenantProfile', {
      tenantIdParams: tenantId
    });
  }


  const changeTextDebounced = (text: string) => {
    setPage(1)
    setSearch(text)
  }

  const changeTextDebouncer = useCallback(debounce(changeTextDebounced, 250), []);

  return (
    <VStack flex={1} mt={statusBarHeight + 12}>
      <View px={4}>
        <Input
          onChangeText={changeTextDebouncer}
          placeholder="Buscar"
          InputLeftElement={<Icon as={MagnifyingGlass} style={{ marginLeft: 8 }} color="coolGray.400" />}
        />
      </View>

      <View flex={1}>
        <Heading mt={8} mx={4} fontFamily="heading" fontSize="sm"> Resultados </Heading>
        <View px={6}>
          {
            isLoading ? (
              <VStack>
                <TenantItemSkeleton />
                <TenantItemSkeleton />
                <TenantItemSkeleton />
                <TenantItemSkeleton />
              </VStack>
            ) : (
              <FlatList
                data={tenants}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TenantItem username={item.username} name={item.name} avatar={item.avatar} onPress={() => handleSelectTenant(item.id)} />
                )}>
              </FlatList>
            )
          }
        </View>

      </View>
    </VStack>
  );
}