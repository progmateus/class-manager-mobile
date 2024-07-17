import { PageHeader } from "@components/PageHeader";
import { Heading, ScrollView, VStack, View } from "native-base";
import { Button } from "@components/Button";
import { StudentItem } from "@components/StudentItem";
import { Info } from "@components/ClassPage/Info";
import { GetRole } from "@utils/GetRole";
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
        <Input value={observation} onChangeText={setObservation} label="Observação" variant="outline" h={24} color="coolGray.800" />
        <VStack space={4}>
          <Button title="CONFIRMAR AULA" onPress={() => handleUpdateStatus("confirm")}> </Button>
          <Button title="CANCELAR AULA" variant="outline" onPress={() => handleUpdateStatus("cancel")} color="danger.500"> </Button>
        </VStack>
      </VStack>
    </View >
  )
}