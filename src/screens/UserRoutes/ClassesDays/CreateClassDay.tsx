import { Input } from "@components/Input";
import { PageHeader } from "@components/PageHeader";
import { ScrollContainer } from "@components/ScrollContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { size } from "lodash";
import { AddIcon, HStack, Select, Text, useTheme, View, VStack } from "native-base";
import { background, border, color } from "native-base/lib/typescript/theme/styled-system";
import { Check } from "phosphor-react-native";
import { Controller, useForm } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import { THEME } from "src/theme";
import { z } from "zod";


const createClassDaySchema = z.object({
  date: z.string(),
  hourStart: z.string(),
  hourEnd: z.string(),
  classId: z.string()
});

type createclassDayProps = z.infer<typeof createClassDaySchema>

export function CreateClassDay() {

  const { control, handleSubmit, formState: { errors } } = useForm<createclassDayProps>({
    resolver: zodResolver(createClassDaySchema)
  });

  const { sizes, colors } = useTheme();

  const handleCreateClassDay = (data: createclassDayProps) => {
    console.log('ok: ', data)
  }

  return (
    <View flex={1}>
      <PageHeader title="Criar aula" rightIcon={Check} rightAction={handleSubmit(handleCreateClassDay)} />
      <ScrollContainer>
        <VStack space={6} mt={4}>
          <Text fontSize="sm" fontWeight="medium" color="coolGray.700" mb={-4}> Data: </Text>
          <Controller
            name="date"
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
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY'
                }} onChangeText={onChange} value={value}
              />

            )}
          />
          <HStack space={4} w={'48%'}>
            <VStack space={4} w={'100%'}>
              <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Horário de inicio: </Text>
              <Controller
                name="hourStart"
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
                    type={'datetime'}
                    options={{
                      format: 'HH:mm'
                    }} onChangeText={onChange} value={value}
                  />
                )}
              />
            </VStack>

            <VStack space={4} w={'100%'}>
              <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Horário de término: </Text>
              <Controller
                name="hourEnd"
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
                    type={'datetime'}
                    options={{
                      format: 'HH:mm'
                    }} onChangeText={onChange} value={value}
                  />
                )}
              />
            </VStack>

          </HStack>

          <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Turma: </Text>
          <Controller
            name="classId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select accessibilityLabel="Selecione a turma" selectedValue={value} variant="outline" mt={-2} onValueChange={onChange}>
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