import { Box, Center, FlatList, Heading, Icon, Text, VStack, View } from "native-base";
import Constants from "expo-constants";
import { Input } from "@components/Input";
import { TenantItem } from "@components/TenantItem";
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
  const items = [
    {
      id: '1',
      image: "https://imagens.ebc.com.br/-ZvfoGkRxj3IGhth9K5DyZix0AU=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/e38skrzx0aythza.jpg?itok=obCfIY5Q",
      name: "Vôlei Paralelo",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      username: "voleiresenha",
      categories: ["Vôlei", "Esporte", "Lazer"]
    },
    {
      id: '2',
      image: "https://imply.com/wp-content/uploads/female-professional-volleyball-players-action-3d-stadium-750x500.jpg",
      name: "Vôlei Resenha",
      username: "voleiresenha",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      categories: ["Vôlei", "Lazer", "Brigas"]
    }, {
      id: '3',
      image: "https://imagens.ebc.com.br/-ZvfoGkRxj3IGhth9K5DyZix0AU=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/e38skrzx0aythza.jpg?itok=obCfIY5Q",
      name: "Vôlei Paralelo",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      username: "voleiresenha",
      categories: ["Vôlei", "Esporte", "Lazer"]
    },
    {
      id: '4',
      image: "https://imply.com/wp-content/uploads/female-professional-volleyball-players-action-3d-stadium-750x500.jpg",
      name: "Vôlei Resenha",
      username: "voleiresenha",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      categories: ["Vôlei", "Lazer", "Brigas"]
    }, {
      id: '5',
      image: "https://imagens.ebc.com.br/-ZvfoGkRxj3IGhth9K5DyZix0AU=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/e38skrzx0aythza.jpg?itok=obCfIY5Q",
      name: "Vôlei Paralelo",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      username: "voleiresenha",
      categories: ["Vôlei", "Esporte", "Lazer"]
    },
    {
      id: '6',
      image: "https://imply.com/wp-content/uploads/female-professional-volleyball-players-action-3d-stadium-750x500.jpg",
      name: "Vôlei Resenha",
      username: "voleiresenha",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      categories: ["Vôlei", "Lazer", "Brigas"]
    }, {
      id: '7',
      image: "https://imagens.ebc.com.br/-ZvfoGkRxj3IGhth9K5DyZix0AU=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/e38skrzx0aythza.jpg?itok=obCfIY5Q",
      name: "Vôlei Paralelo",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      username: "voleiresenha",
      categories: ["Vôlei", "Esporte", "Lazer"]
    },
    {
      id: '8',
      image: "https://imply.com/wp-content/uploads/female-professional-volleyball-players-action-3d-stadium-750x500.jpg",
      name: "Vôlei Resenha",
      username: "voleiresenha",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      categories: ["Vôlei", "Lazer", "Brigas"]
    }, {
      id: '9',
      image: "https://imagens.ebc.com.br/-ZvfoGkRxj3IGhth9K5DyZix0AU=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/e38skrzx0aythza.jpg?itok=obCfIY5Q",
      name: "Vôlei Paralelo",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      username: "voleiresenha",
      categories: ["Vôlei", "Esporte", "Lazer"]
    },
    {
      id: '10',
      image: "https://imply.com/wp-content/uploads/female-professional-volleyball-players-action-3d-stadium-750x500.jpg",
      name: "Vôlei Resenha",
      username: "voleiresenha",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      categories: ["Vôlei", "Lazer", "Brigas"]
    }, {
      id: '11',
      image: "https://imagens.ebc.com.br/-ZvfoGkRxj3IGhth9K5DyZix0AU=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/e38skrzx0aythza.jpg?itok=obCfIY5Q",
      name: "Vôlei Paralelo",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      username: "voleiresenha",
      categories: ["Vôlei", "Esporte", "Lazer"]
    },
    {
      id: '12',
      image: "https://imply.com/wp-content/uploads/female-professional-volleyball-players-action-3d-stadium-750x500.jpg",
      name: "Vôlei Resenha",
      username: "voleiresenha",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      categories: ["Vôlei", "Lazer", "Brigas"]
    }, {
      id: '13',
      image: "https://imagens.ebc.com.br/-ZvfoGkRxj3IGhth9K5DyZix0AU=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/e38skrzx0aythza.jpg?itok=obCfIY5Q",
      name: "Vôlei Paralelo",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      username: "voleiresenha",
      categories: ["Vôlei", "Esporte", "Lazer"]
    },
    {
      id: '14',
      image: "https://imply.com/wp-content/uploads/female-professional-volleyball-players-action-3d-stadium-750x500.jpg",
      name: "Vôlei Resenha",
      username: "voleiresenha",
      description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      categories: ["Vôlei", "Lazer", "Brigas"]
    }
  ]

  const [tenants, setTenants] = useState<ITenant[]>([])
  const [search, setSearch] = useState("")

  const navigation = useNavigation<UserNavigatorRoutesProps>();

  function handleClickTenant() {
    navigation.navigate('tenant');
  }

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

  return (
    <VStack flex={1} mt={statusBarHeight + 18}>
      <View px={4}>
        <Input
          value={search}
          onChangeText={(e) => handleSearch(e)}
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
            <TenantItem onPress={handleClickTenant} username={item.username} name={item.name} />
          )}>
        </FlatList>
      </View>
    </VStack>
  );
}