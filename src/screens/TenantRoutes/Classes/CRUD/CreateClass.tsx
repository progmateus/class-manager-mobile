import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, VStack } from "native-base";
import { Check } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateClassService } from "src/services/classesService";
import { z } from "zod";
import dayjs from "dayjs"
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { useAuth } from "@hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";


var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const createClassSchema = z.object({
  name: z.string().min(3, 'Min 3 caracteres').max(80, 'Max 80 caracteres'),
  description: z.string()
});

type CreateClassProps = z.infer<typeof createClassSchema>

export function CreateClass() {
  const [isLoading, setIsLoadig] = useState(false)

  const { tenant } = useAuth()
  const tenantId = tenant?.id

  const queryClient = useQueryClient();


  const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateClassProps>({
    resolver: zodResolver(createClassSchema)
  });

  const navigation = useNavigation<TenantNavigatorRoutesProps>();

  useFocusEffect(useCallback(() => {
    reset()
  }, []))

  const handleCreateClass = (data: CreateClassProps) => {
    if (isLoading) return;
    setIsLoadig(true)

    CreateClassService(tenantId, data.name, data.description).then(async ({ data }) => {
      fireSuccesToast('Turma criada')
      await queryClient.cancelQueries({
        queryKey: ['get-classes', tenantId]
      })
      navigation.navigate('classProfile', {
        tenantIdParams: tenantId,
        classId: data.data.id
      })
    }).catch(() => {
      fireErrorToast('Ocorreu um erro')
    }).finally(() => {
      setIsLoadig(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Criar Turma" rightIcon={Check} rightAction={handleSubmit(handleCreateClass)} />
      <ScrollContainer>
        <VStack space={6} mt={2}>

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Nome" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
            )}
          />


          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Descrição" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.description?.message} />
            )}
          />
        </VStack>
      </ScrollContainer>
    </View>
  )
}