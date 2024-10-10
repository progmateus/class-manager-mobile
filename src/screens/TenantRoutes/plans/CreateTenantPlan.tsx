import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Text, useTheme, View, VStack } from "native-base";
import { Check } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import { z } from "zod";
import dayjs from "dayjs"
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { CreateTenantPlanService } from "src/services/tenantPlansService";
import { useAuth } from "@hooks/useAuth";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { useQueryClient } from "@tanstack/react-query";


var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const createTenantPlanSchema = z.object({
  name: z.string(),
  description: z.string(),
  timesOfweek: z.string().regex(/\d+/g, "Apenas números"),
  price: z.string()
});

type CreateTenantplanProps = z.infer<typeof createTenantPlanSchema>

export function CreateTenantPlan() {
  const [isLoading, setIsLoadig] = useState(false)
  const { sizes, colors } = useTheme();
  const navigation = useNavigation<TenantNavigatorRoutesProps>()

  const { tenant } = useAuth()
  const queryClient = useQueryClient();

  const tenantId = tenant?.id


  const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateTenantplanProps>({
    resolver: zodResolver(createTenantPlanSchema)
  });

  useFocusEffect(useCallback(() => {
    reset()
  }, []))

  const handleCreateTenantPlan = (data: CreateTenantplanProps) => {
    if (isLoading) return;
    setIsLoadig(true)

    const { name, description, price, timesOfweek } = data;
    CreateTenantPlanService(tenantId, name, description, Number(timesOfweek), price.replaceAll(/[A-z\$\.\-\,]/g, "").replace(/([0-9]+)([0-9]{2})/, '$1.$2')).then(async () => {
      fireSuccesToast('Plano criado')
      await queryClient.invalidateQueries({
        queryKey: ['get-tenant-plans', tenantId]
      })
      navigation.navigate('tenantPlansList')
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
      <PageHeader title="Criar plano" rightIcon={Check} rightAction={handleSubmit(handleCreateTenantPlan)} />
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
            name="timesOfweek"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Vezes por semana" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.timesOfweek?.message} />
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