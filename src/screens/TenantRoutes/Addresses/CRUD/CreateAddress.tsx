import { Input } from "@components/form/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, VStack } from "native-base";
import { Check } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs"
import { fireErrorToast, fireSuccesToast } from "@utils/HelperNotifications";
import { TenantNavigatorRoutesProps } from "@routes/tenant.routes";
import { useAuth } from "@hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { CreateTenantAddressService } from "src/services/addressService";


var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const createAddressSchema = z.object({
  street: z.string().min(3, 'Min 3 caracteres').max(80, 'Max 80 caracteres'),
  city: z.string().min(3, 'Min 3 caracteres').max(80, 'Max 80 caracteres'),
  state: z.string().min(3, 'Min 3 caracteres').max(80, 'Max 80 caracteres'),
  number: z.union([z.string().length(0), z.string().max(10), z.string().min(1)])
    .optional()
    .transform(e => e === "" ? undefined : e),
});

type CreateAddressProps = z.infer<typeof createAddressSchema>

export function CreateAddress() {
  const [isLoading, setIsLoadig] = useState(false)

  const { tenant } = useAuth()
  const tenantId = tenant?.id

  const queryClient = useQueryClient();


  const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateAddressProps>({
    resolver: zodResolver(createAddressSchema)
  });

  const navigation = useNavigation<TenantNavigatorRoutesProps>();

  useFocusEffect(useCallback(() => {
    reset()
  }, []))

  const handleCreateClass = ({ city, state, street }: CreateAddressProps) => {
    if (isLoading) return;
    setIsLoadig(true)

    CreateTenantAddressService({
      city,
      state,
      street,
      tenantId
    }).then(async ({ data }) => {
      fireSuccesToast('Endereço criado')
      await queryClient.invalidateQueries({
        queryKey: ['get-addresses', tenantId]
      })
      navigation.navigate('addressesList')
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
            name="street"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Rua" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.street?.message} />
            )}
          />


          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Cidate" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.city?.message} />
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Estado" variant="outline" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.state?.message} />
            )}
          />
        </VStack>
      </ScrollContainer>
    </View>
  )
}