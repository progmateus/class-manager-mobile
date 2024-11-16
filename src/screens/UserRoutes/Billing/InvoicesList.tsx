import { InvoiceItem } from "@components/Items/InvoiceItem";
import { Loading } from "@components/Loading";
import { PageHeader } from "@components/PageHeader";
import { Viewcontainer } from "@components/ViewContainer";
import { IInvoiceDTO } from "@dtos/invoices/IInvoiceDTO";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Text, View, VStack } from "native-base";
import { ListInvoicesService } from "src/services/invoiceService";

export function InvoicesList() {
  const navigation = useNavigation<UserNavigatorRoutesProps>();
  const { user } = useAuth();

  const loadInvoices = async () => {
    try {
      const { data } = await ListInvoicesService(undefined, user.id)
      return data.data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: invoices, isLoading } = useQuery<IInvoiceDTO[]>({
    queryKey: ['get-tenants', user.id],
    queryFn: loadInvoices
  })

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
                data={invoices}
                pb={20}
                keyExtractor={invoice => invoice.id}
                renderItem={({ item }) => (
                  <InvoiceItem invoice={item} />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                ListEmptyComponent={<Text fontFamily="body" textAlign="center"> Nenhum resultado encontrado </Text>}
              >
              </FlatList>
            )
        }

      </Viewcontainer>
    </View>
  )
}