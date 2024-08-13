import { PageHeader } from "@components/PageHeader";
import { Text, TextArea, VStack, View } from "native-base";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useState } from "react";

export function UpdateClassDayStatus() {
  const [observation, setObservation] = useState("")


  const handleUpdateStatus = (status = "confirm") => {
    alert(`${observation}, ${status}`)
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
          <Button title="CONFIRMAR AULA" onPress={() => handleUpdateStatus("confirm")}> </Button>
          <Button title="CANCELAR AULA" variant="outline" onPress={() => handleUpdateStatus("cancel")} color="danger.500"> </Button>
        </VStack>
      </VStack>
    </View >
  )
}