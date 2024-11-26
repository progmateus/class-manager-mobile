import { PageHeader } from "@components/PageHeader";
import { Text, VStack, View } from "native-base";
import { Button } from "@components/Button";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UpdateClassDayStatusService } from "src/services/classDaysService";
import { fireInfoToast, fireSuccesToast, fireWarningToast } from "@utils/HelperNotifications";
import { EClassDayStatus } from "src/enums/EClassDayStatus";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useAuth } from "@hooks/useAuth";
import { TextArea } from "@components/form/TextArea";
import { ValidationError } from "@utils/errors/ValidationError";
import { useQueryClient } from "@tanstack/react-query";


type RouteParamsProps = {
  classDayId: string;
  tenantIdParams: string;
}

export function UpdateClassDayStatus() {
  const route = useRoute()
  const [observation, setObservation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<UserNavigatorRoutesProps>();

  const { classDayId, tenantIdParams } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams

  const queryClient = useQueryClient();


  const handleUpdateClassDayStatus = (status: EClassDayStatus) => {

    if (observation.length > 40) {
      fireWarningToast('A observação seve conter no máximo 40 caracteres')
      return
    }
    UpdateClassDayStatusService(tenantId, classDayId, EClassDayStatus.CONCLUDED, observation).then(({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ['get-class-day-profile', tenantId, classDayId]
      })
      if (status == EClassDayStatus.CONCLUDED) {
        fireSuccesToast('Aula confirmada')
      }

      if (status == EClassDayStatus.CANCELED) {
        fireInfoToast('Aula cancelada')
      }
      navigation.navigate('classDayProfile', {
        classDayId,
        tenantIdParams: tenantId
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
          <TextArea label="Observação:" value={observation} onChangeText={setObservation} h={24} px={2} fontSize="sm" variant="outline" color="coolGray.800" />
        </View>
        <VStack space={4}>
          <Button title="CONFIRMAR AULA" h={10} fontSize="xs" rounded="md" onPress={() => handleUpdateClassDayStatus(EClassDayStatus.CONCLUDED)} isLoading={isLoading}> </Button>
          <Button title="CANCELAR AULA" h={10} fontSize="xs" rounded="md" variant="outline" onPress={() => handleUpdateClassDayStatus(EClassDayStatus.CANCELED)} color="danger.500" isLoading={isLoading}> </Button>
        </VStack>
      </VStack>
    </View >
  )
}