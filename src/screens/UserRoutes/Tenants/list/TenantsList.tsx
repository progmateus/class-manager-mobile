import { Box, Center, FlatList, Heading, Icon, Text, VStack, View } from "native-base";
import Constants from "expo-constants";
import { Input } from "@components/form/Input";
import { TenantItem } from "@components/Items/TenantItem";
import { MagnifyingGlass } from "phosphor-react-native"
import { useNavigation } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useCallback, useEffect, useState } from "react";
import { ListTenantsService } from "src/services/tenantsService";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { debounce } from "lodash";
import { useForm } from "react-hook-form";

const statusBarHeight = Constants.statusBarHeight;

interface ITenant {
  id: string,
  name: string,
  username: string,
  avatar: string
}

type serahcProps = {
  search: string
}

export function TenantsList() {
  const [tenants, setTenants] = useState<ITenant[]>([])
  const [search, setSearch] = useState("")

  const navigation = useNavigation<UserNavigatorRoutesProps>();

  function handleSearch(e: string) {
    setSearch(e)
    listTenants();
  }


  function listTenants() {
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

  return (
    <VStack flex={1} mt={statusBarHeight + 12}>
      <View px={4}>
        <Input
          value={search}
          onChangeText={handleSearch}
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