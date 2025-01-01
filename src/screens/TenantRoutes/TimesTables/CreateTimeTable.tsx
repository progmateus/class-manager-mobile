import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Box, Heading, View, VStack } from "native-base";
import { useCallback, useState } from "react";
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { useAuth } from "@hooks/useAuth";
import { CreateTimeTableService } from "src/services/timeTablesService";
import { Button } from "@components/Button";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { useQueryClient } from "@tanstack/react-query";



export function CreateTimeTable() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const queryClient = useQueryClient();

  useFocusEffect(useCallback(() => {
    setName("")
  }, []))

  const { tenant } = useAuth()

  const handleCreate = () => {
    if (isLoading) return;

    if (!name || name.length < 3 || name.length > 80) {
      fireErrorToast('Nome invialido')
      return
    }
    CreateTimeTableService(name, tenant.id).then(async ({ data }) => {
      setIsLoading(true)
      fireSuccesToast('Tabela criada com sucesso!')
      await queryClient.invalidateQueries({
        queryKey: ['get-times-tables', tenant.id]
      })
      navigation.navigate('timeTable', { timeTableId: data.data.id })
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Criar" />
      <ScrollContainer>
        <VStack pb={20} px={4} flex={1} space={4}>
          <Heading fontFamily="heading" textAlign="center" fontSize="md" mb={8}> Defina um nome para a tabela </Heading>
          <Input variant="outline" onChangeText={setName} value={name} />
          <Box w="48" alignSelf="center">
            <Button title="Criar" mt={8} rounded="lg" onPress={handleCreate} isLoading={isLoading} />
          </Box>
        </VStack>
      </ScrollContainer>
    </View>
  )
}