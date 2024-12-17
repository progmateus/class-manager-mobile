import { Box, FlatList, HStack, Heading, Icon, Text, VStack, View } from "native-base";
import Constants from "expo-constants";
import { Input } from "@components/form/Input";
import { TenantItem } from "@components/Items/TenantItem";
import { MagnifyingGlass } from "phosphor-react-native"
import { useNavigation } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ListTenantsService } from "src/services/tenantsService";
import { debounce } from "lodash";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { TenantItemSkeleton } from "@components/skeletons/Items/TenantItemSkeleton";
import { ITenantPreviewDTO } from "@dtos/tenants/ITenantPreviewDTO";
import { Loading } from "@components/Loading";

const statusBarHeight = Constants.statusBarHeight;

export function TenantsList() {
  const [search, setSearch] = useState("")
  const navigation = useNavigation<UserNavigatorRoutesProps>();

  const loadTenants = async (page: any) => {
    try {
      const { data } = await ListTenantsService({ search, page: Number(page) })
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<ITenantPreviewDTO[]>({
    queryKey: ['get-tenants', search],
    queryFn: ({ pageParam }) => loadTenants(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam: any) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    }
  })


  function handleSelectTenant(tenantId: string) {
    navigation.navigate('tenantProfile', {
      tenantIdParams: tenantId
    });
  }

  function onLoadMore() {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
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
        <View px={6} pb="16">
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
                data={results?.pages.map(page => page).flat()}
                keyExtractor={item => item.id}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TenantItem username={item.username} name={item.name} avatar={item.avatar} onPress={() => handleSelectTenant(item.id)} />
                )}
                ListFooterComponent={
                  isFetchingNextPage ? <Loading /> : <></>
                }
                ListEmptyComponent={
                  <Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>
                }

              >
              </FlatList>
            )
          }
        </View>

      </View>
    </VStack>
  );
}