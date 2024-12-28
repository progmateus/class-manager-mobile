import { PageHeader } from "@components/PageHeader";
import { Divider, Modal, Text, VStack, View, Button as NativeBaseButton } from "native-base";
import { Button } from "@components/Button";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UpdateClassDayStatusService } from "src/services/classDaysService";
import { fireInfoToast, fireSuccesToast, fireWarningToast } from "@utils/HelperNotifications";
import { EClassDayStatus } from "src/enums/EClassDayStatus";
import { UserNavigatorRoutesProps } from "@routes/user.routes";
import { useAuth } from "@hooks/useAuth";
import { TextArea } from "@components/form/TextArea";
import { useQueryClient } from "@tanstack/react-query";


type RouteParamsProps = {
  classDayId: string;
  tenantIdParams: string;
}

export function UpdateClassDayStatus() {
  const route = useRoute()
  const [observation, setObservation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, setStatus] = useState(EClassDayStatus.CONCLUDED)
  const navigation = useNavigation<UserNavigatorRoutesProps>();

  const { classDayId, tenantIdParams } = route.params as RouteParamsProps;
  const { tenant } = useAuth()
  const tenantId = tenant?.id ?? tenantIdParams

  const queryClient = useQueryClient();


  const handleUpdateClassDayStatus = () => {

    if (observation.length > 40) {
      fireWarningToast('A observação seve conter no máximo 40 caracteres')
      return
    }
    UpdateClassDayStatusService(tenantId, classDayId, status, observation).then(({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ['get-class-day-profile', classDayId]
      })
      queryClient.invalidateQueries({
        queryKey: ['get-classes-days']
      })
      if (status == EClassDayStatus.CONCLUDED) {
        fireSuccesToast('Aula concluida')
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

  const handleSelectNewStatus = (status: EClassDayStatus) => {
    setStatus(status)
    setIsModalOpen(true)
  }

  return (
    <View flex={1}>
      <PageHeader title="Atualizar status" />
      <VStack justifyContent="space-between" px={4} py={8} flex={1}>
        <View>
          <TextArea label="Observação:" value={observation} onChangeText={setObservation} h={24} px={2} fontSize="sm" variant="outline" color="coolGray.800" />
        </View>
        <VStack space={4}>
          <Button title="CONCLUIR AULA" h={10} fontSize="xs" rounded="md" onPress={() => handleSelectNewStatus(EClassDayStatus.CONCLUDED)} isLoading={isLoading}> </Button>
          <Button title="CANCELAR AULA" h={10} fontSize="xs" rounded="md" variant="outline" onPress={() => handleSelectNewStatus(EClassDayStatus.CANCELED)} color="danger.500" isLoading={isLoading}> </Button>
        </VStack>
      </VStack>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350">
          <Modal.Header borderWidth={0}>
            <Text fontFamily="heading"> {status == EClassDayStatus.CONCLUDED ? 'Concluir' : 'Cancelar'} Aula </Text>
          </Modal.Header>
          <Modal.Body justifyContent="center" py={6} borderWidth={0}>
            <Text fontFamily="body" color="coolGray.600">
              Deseja atualizar o status da aula? Depois de realizada esta ação não poderá ser desfeita.
            </Text>
          </Modal.Body>
          <Modal.Footer borderWidth={0}>
            <VStack flex={1}>
              {
                status == EClassDayStatus.CONCLUDED ? (
                  <Button title="Concluir" bgColor="green.600" isLoading={isLoading} onPress={handleUpdateClassDayStatus} />
                ) : (
                  <Button title="Cancelar" bgColor="red.500" isLoading={isLoading} onPress={handleUpdateClassDayStatus} />
                )
              }
              <NativeBaseButton mt={2} variant="unstyled" fontWeight="bold" color="coolGray.500" onPress={() => setIsModalOpen(false)}>
                Voltar
              </NativeBaseButton>
            </VStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View >
  )
}