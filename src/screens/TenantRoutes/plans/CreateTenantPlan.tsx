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
import { CreateClassDayService } from "src/services/classDaysService";
import { ListClassesService } from "src/services/classesService";
import { z } from "zod";
import dayjs from "dayjs"
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";


var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

type RouteParamsProps = {
  tenantId: string;
}

const createClassDaySchema = z.object({
  name: z.string(),
  description: z.string(),
  timesOfweek: z.string().regex(/\d+/g, "Apenas números"),
  price: z.string()
});

type createclassDayProps = z.infer<typeof createClassDaySchema>

export function CreateTenantPlan() {
  const [classes, setClasses] = useState([])
  const [isLoading, setIsLoadig] = useState(false)
  const { sizes, colors } = useTheme();
  const route = useRoute()

  const { tenantId } = route.params as RouteParamsProps;

  const { control, handleSubmit, formState: { errors } } = useForm<createclassDayProps>({
    resolver: zodResolver(createClassDaySchema)
  });


  useEffect(() => {
    ListClassesService(tenantId).then(({ data }) => {
      setClasses(data.data)
    }).catch((err) => {
      console.log('err: ', err)
    })
  }, [tenantId])

  const handleCreateClassDay = (data: createclassDayProps) => {
    if (isLoading) return;
    setIsLoadig(true)

    const { name, description, price, timesOfweek } = data;

    CreateClassDayService(tenantId, name, description, timesOfweek, price).then(() => {
      fireSuccesToast('Aula criada')
    }).catch((err) => {
      console.log(err)
      fireErrorToast('Ocorreu um erro')
    }).finally(() => {
      setIsLoadig(false)
    })
  }

  return (
    <View flex={1}>
      <PageHeader title="Criar aula" rightIcon={Check} rightAction={handleSubmit(handleCreateClassDay)} />
      <ScrollContainer>
        <VStack space={6} mt={2}>

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Nome" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} />
            )}
          />


          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Descrição" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} />
            )}
          />


          <Controller
            name="timesOfweek"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Vezes por semana" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} />
            )}
          />



          <Text fontSize="sm" fontWeight="medium" color="coolGray.700" mb={-4}> Preço: </Text>
          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInputMask
                style={{
                  width: '100%',
                  borderBottomColor: 'red',
                  color: colors.coolGray[700],
                  height: sizes[10],
                  borderColor: colors.coolGray[300],
                  borderWidth: 0.8,
                  borderRadius: 4,
                  paddingLeft: sizes[4]
                }}
                type={'money'}
                options={{
                  precision: 2,
                  separator: ',',
                  delimiter: '.',
                  suffixUnit: ''
                }} onChangeText={onChange} value={value}
              />

            )}
          />
        </VStack>
      </ScrollContainer>
    </View>
  )
}