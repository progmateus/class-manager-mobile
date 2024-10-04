import { Box, Center, FlatList, Heading, Icon, Text, VStack, View } from "native-base";
import Constants from "expo-constants";
import { Input } from "@components/form/Input";
import { TenantItem } from "@components/Items/TenantItem";
import { MagnifyingGlass } from "phosphor-react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useCallback, useEffect, useState } from "react";
import { ListTenantsService } from "src/services/tenantsService";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { debounce } from "lodash";
import { useForm } from "react-hook-form";
import { ITenantDTO } from "@dtos/tenants/ITenantDTO";

const statusBarHeight = Constants.statusBarHeight;

export function TenantsList() {
  const [tenants, setTenants] = useState<ITenantDTO[]>([])
  const [search, setSearch] = useState("")

  const navigation = useNavigation<UserNavigatorRoutesProps>();

  function handleSearch(e: string) {
    setSearch(e)
    listTenants();
  }

  useFocusEffect(useCallback(() => {
    listTenants()
  }, [search]))


  const listTenants = () => {
    ListTenantsService(search).then(({ data }) => {
      setTenants(data.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  function handleSelectTenant(tenantId: string) {
    navigation.navigate('tenantProfile', {
      tenantIdParams: tenantId
    });
  }


  const changeTextDebounced = (text: string) => {
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
        <FlatList
          px={6}
          data={tenants}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TenantItem username={item.username} name={item.name} avatar={item.avatar} onPress={() => handleSelectTenant(item.id)} />
          )}>
        </FlatList>
      </View>
    </VStack>
  );
}