import { PageHeader } from "@components/PageHeader";
import { Text, TextArea, VStack, View } from "native-base";
import { Button } from "@components/Button";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UpdateClassDayStatusService } from "src/services/classDaysService";
import { fireSuccesToast } from "@utils/HelperNotifications";
import { EClassDayStatus } from "src/enums/EClassDayStatus";
import { UserNavigatorRoutesProps } from "@routes/user.routes";


type RouteParamsProps = {
  classDayId: string;
  tenantId: string;
}

export function UpdateClassDayStatus() {
  const route = useRoute()
  const [observation, setObservation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<UserNavigatorRoutesProps>();

  const { classDayId, tenantId } = route.params as RouteParamsProps;


  const handleCancelClassDay = () => {
    setIsLoading(true)
    UpdateClassDayStatusService(tenantId, classDayId, EClassDayStatus.CANCELED, observation).then(({ data }) => {
      fireSuccesToast('Aula cancelada')
      navigation.navigate('classDayInfo', {
        classDayId,
        tenantId
      })
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleConfirmClassDay = () => {
    setIsLoading(true)
    UpdateClassDayStatusService(tenantId, classDayId, EClassDayStatus.CONCLUDED, observation).then(({ data }) => {
      fireSuccesToast('Aula confirmada')
      navigation.navigate('classDayInfo', {
        classDayId,
        tenantId
      })
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Atualizar status" />
      <VStack justifyContent="space-between" px={4} py={8} flex={1}>
        <View>
          <Text fontSize="sm" fontWeight="medium" mb={2} color="coolGray.700"> Observação: </Text>
          <TextArea autoCompleteType={false} value={observation} onChangeText={setObservation} h={24} px={2} fontSize="sm" variant="outline" color="coolGray.800" />
        </View>
        <VStack space={4}>
          <Button title="CONFIRMAR AULA" onPress={handleConfirmClassDay} isLoading={isLoading}> </Button>
          <Button title="CANCELAR AULA" variant="outline" onPress={handleCancelClassDay} color="danger.500" isLoading={isLoading}> </Button>
        </VStack>
      </VStack>
    </View >
  )
}