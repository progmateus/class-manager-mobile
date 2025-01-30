import { InvoiceItem } from "@components/Items/InvoiceItem";
import { Loading } from "@components/Loading";
import { PageHeader } from "@components/PageHeader";
import { Viewcontainer } from "@components/ViewContainer";
import { IInvoiceDTO } from "@dtos/invoices/IInvoiceDTO";
import { useAuth } from "@hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { FlatList, Text, View, VStack } from "native-base";
import { useState } from "react";
import { EAuthType } from "src/enums/EAuthType";
import { ETargetType } from "src/enums/ETargetType";
import { ListInvoicesService } from "src/services/invoiceService";


type RouteParamsProps = {
  tenantIdParams?: string;
  subscriptionId?: string;
  userId?: string;
}

export function InvoicesList() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { user, authenticationType, tenant } = useAuth();

  const route = useRoute()

  const queryClient = useQueryClient()

  const { tenantIdParams, subscriptionId, userId } = route.params as RouteParamsProps;

  const tenantId = tenant?.id ?? tenantIdParams

  const loadInvoices = async (page: number) => {
    const targetTypes = [];

    if (authenticationType == EAuthType.TENANT && !subscriptionId) {
      targetTypes.push(ETargetType.TENANT)
    }

    try {
      const { data } = await ListInvoicesService({
        page,
        userId: authenticationType == EAuthType.USER ? user.id : undefined,
        subscriptionId,
        tenantId,
        targetTypes
      })
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<IInvoiceDTO[]>({
    queryKey: ['get-invoices', userId, tenantId, subscriptionId],
    queryFn: ({ pageParam }) => loadInvoices(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam: any) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    }
  })

  function onLoadMore() {
    if (!isLoading && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }

  const onRefresh = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['get-invoices']
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Cobranças" />
      <Viewcontainer>
        {
          isLoading ? (
            <VStack space={3}>
              <Loading />
            </VStack>
          )
            : (
              <FlatList
                data={results?.pages.map(page => page).flat()}
                pb={20}
                keyExtractor={invoice => invoice.id}
                renderItem={({ item, index }) => (
                  <InvoiceItem key={item.id} invoice={item} />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                ListFooterComponent={
                  isFetchingNextPage ? <Loading /> : <></>
                }
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={
                  <Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>
                }
                refreshing={isLoading}
                onRefresh={onRefresh}
              >
              </FlatList>
            )
        }

      </Viewcontainer>
    </View>
  )
}