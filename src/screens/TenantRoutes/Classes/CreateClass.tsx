import { Input } from "@components/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoute } from "@react-navigation/native";
import { Text, useTheme, View, VStack } from "native-base";
import { Check } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import { ListClassesService } from "src/services/classesService";
import { z } from "zod";
import dayjs from "dayjs"
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { CreateTenantPlanService } from "src/services/tenantPlansService";


var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

type RouteParamsProps = {
  tenantId: string;
}

const createClassSchema = z.object({
  name: z.string(),
  description: z.string()
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


  useEffect(() => {
    ListClassesService(tenantId).then(({ data }) => {
      setClasses(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    })
  }, [tenantId])

  const handleCreateTenantPlan = (data: CreateClassProps) => {
    if (isLoading) return;
    setIsLoadig(true)

    const { name, description, } = data;

    fireSuccesToast('Plano criado')
  }

  return (
    <View flex={1}>
      <PageHeader title="Criar aula" rightIcon={Check} rightAction={handleSubmit(handleCreateTenantPlan)} />
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