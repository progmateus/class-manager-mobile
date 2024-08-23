import { Input } from "@components/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddIcon, HStack, Select, Text, View, VStack } from "native-base";
import { Check } from "phosphor-react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";


const createClassDaySchema = z.object({
  date: z.string(),
  hourStart: z.string(),
  hourEnd: z.string(),
  classId: z.string(),
});

type createclassDayProps = z.infer<typeof createClassDaySchema>

export function CreateClassDay() {

  const { control, handleSubmit, formState: { errors } } = useForm<createclassDayProps>({
    resolver: zodResolver(createClassDaySchema)
  });

  const handleCreateClassDay = () => {
    console.log('ok')
  }
  return (
    <View flex={1}>
      <PageHeader title="Criar aula" rightIcon={Check} rightAction={handleCreateClassDay} />
      <ScrollContainer>
        <VStack space={6} mt={12}>
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input label="Data" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.date?.message} />
            )}
          />
          <HStack space={4} w={'48%'}>
            <Controller
              name="hourStart"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="Horário inicial:" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.hourStart?.message} />
              )}
            />

            <Controller
              name="hourEnd"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input label="Horário final:" variant="outline" onChangeText={onChange} value={value} errorMessage={errors.hourEnd?.message} />
              )}
            />

          </HStack>

          <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Turma: </Text>
          <Controller
            name="classId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select accessibilityLabel="Choose Service" variant="outline" mt={-2}>
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
                <Select.Item label="Cross Platform Development" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
                <Select.Item label="Backend Development" value="backend" />
              </Select>
            )}
          />
        </VStack>
      </ScrollContainer>
    </View>
  )
}