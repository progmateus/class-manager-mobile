import { PageHeader } from "@components/PageHeader";
import { Center, HStack, Text, VStack, View } from "native-base";
import { TouchableOpacity } from "react-native";

export function Classes() {
  const dates = [
    new Date(2024, 7, 9),
    new Date(2024, 7, 10),
    new Date(2024, 7, 11),
    new Date(2024, 7, 12),
    new Date(2024, 7, 13),
    new Date(2024, 7, 14),
    new Date(2024, 7, 15),
  ];

  const getDay = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      timeZone: 'America/Sao_Paulo',
    }).format(date)
  };

  const getWeekDay = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'short',
      timeZone: 'America/Sao_Paulo',
    }).format(date)
  };

  return (
    <View flex={1}>
      <PageHeader title="Aulas" />
      <VStack flex={1}>
        <HStack>
          {dates && dates.length && (
            dates.map((date) => {
              return (
                <VStack flex={1} justifyContent="space-between" mt={4}>
                  <TouchableOpacity>
                    <Center>
                      <Text textTransform="capitalize">
                        {getWeekDay(date).replace('.', '')}
                      </Text>
                      <Text fontFamily="heading" mt={2} fontSize="xl">
                        {getDay(date)}
                      </Text>
                      <View mt={2} w="1/3" borderBottomColor="coolGray.300" borderBottomWidth={2}></View>
                    </Center>
                  </TouchableOpacity>
                </VStack>
              )
            })
          )}
        </HStack>
      </VStack>
    </View>
  );
}