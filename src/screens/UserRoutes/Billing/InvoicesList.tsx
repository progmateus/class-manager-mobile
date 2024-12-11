import { InvoiceItem } from "@components/Items/InvoiceItem";
import { Loading } from "@components/Loading";
import { PageHeader } from "@components/PageHeader";
import { Viewcontainer } from "@components/ViewContainer";
import { IInvoiceDTO } from "@dtos/invoices/IInvoiceDTO";
import { useAuth } from "@hooks/useAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FlatList, Text, View, VStack } from "native-base";
import { EAuthType } from "src/enums/EAuthType";
import { ListInvoicesService } from "src/services/invoiceService";

export function InvoicesList() {
  const { user, authenticationType } = useAuth();

  const loadInvoices = async (page: number) => {
    try {
      const { data } = await ListInvoicesService({ page, userId: authenticationType == EAuthType.USER ? user.id : undefined })
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: results, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<IInvoiceDTO[]>({
    queryKey: ['get-invoices', user.id],
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
              >
              </FlatList>
            )
        }

      </Viewcontainer>
    </View>
  )
}