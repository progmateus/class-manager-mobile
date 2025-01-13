import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { View, VStack } from "native-base";
import { Check } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { useAuth } from "@hooks/useAuth";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { useQueryClient } from "@tanstack/react-query";
import { GetClassService, UpdateClassDataService } from "src/services/classesService";
import { IClassDTO } from "@dtos/classes/IClassDTO";

const updateclassSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim()
});

type RouteParamsProps = {
  classId: string;
}

type UpdateClassProps = z.infer<typeof updateclassSchema>

export function UpdateClassData() {
  const [isLoading, setIsLoadig] = useState(false)
  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const route = useRoute()
  const { classId } = route.params as RouteParamsProps;

  const { tenant } = useAuth()
  const queryClient = useQueryClient();

  const tenantId = tenant?.id

  const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateClassProps>({
    resolver: zodResolver(updateclassSchema)
  });

  useFocusEffect(useCallback(() => {
    loadClassData()
  }, []))


  const loadClassData = () => {
    GetClassService(tenant.id, classId).then(({ data }) => {
      const { name, description } = data.data as IClassDTO
      const defaultValues = {
        name,
        description
      }
      reset(defaultValues)
    })
  }

  const handleUpdateClass = ({ name, description }: UpdateClassProps) => {
    if (isLoading || !tenantId || classId) return;
    setIsLoadig(true)

    UpdateClassDataService(tenantId, classId, name, description).then(async () => {
      fireSuccesToast('Turma atualizada')
      await queryClient.invalidateQueries({
        queryKey: ['get-classes', tenantId],
        exact: true
      })
      navigation.navigate('classProfile', { classId, tenantIdParams: tenantId })
      reset()
    }).catch((err) => {
      console.log(err)
      fireErrorToast('Ocorreu um erro')
    }).finally(() => {
      setIsLoadig(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Atualizar turma" rightIcon={Check} rightAction={handleSubmit(handleUpdateClass)} />
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