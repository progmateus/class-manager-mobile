import { Input } from "@components/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, useTheme, View, VStack } from "native-base";
import { Check } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import { CreateClassService, ListClassesService } from "src/services/classesService";
import { z } from "zod";
import dayjs from "dayjs"
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { CreateTenantPlanService } from "src/services/tenantPlansService";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";


var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

type RouteParamsProps = {
  tenantId: string;
}

const createClassSchema = z.object({
  name: z.string().min(3, 'Min 3 caracteres').max(80, 'Max 80 caracteres'),
  description: z.string(),
  businessHour: z.string()
});

type CreateClassProps = z.infer<typeof createClassSchema>

export function CreateClass() {
  const [classes, setClasses] = useState([])
  const [isLoading, setIsLoadig] = useState(false)
  const { sizes, colors } = useTheme();
  const route = useRoute()

  const { tenantId } = route.params as RouteParamsProps;

  const { control, handleSubmit, formState: { errors } } = useForm<CreateClassProps>({
    resolver: zodResolver(createClassSchema)
  });

  const navigation = useNavigation<TenantNavigatorRoutesProps>();


  useEffect(() => {
    ListClassesService(tenantId).then(({ data }) => {
      setClasses(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    })
  }, [tenantId])

  const handleCreateClass = (data: CreateClassProps) => {
    if (isLoading) return;
    setIsLoadig(true)

    CreateClassService(tenantId, data.name, data.description, data.businessHour).then(({ data }) => {
      fireSuccesToast('Turma criada')
      navigation.navigate('classProfile', {
        tenantId,
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

          <Controller
            name="businessHour"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Horário" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.businessHour?.message} />
            )}
          />
        </VStack>
      </ScrollContainer>
    </View>
  )
}