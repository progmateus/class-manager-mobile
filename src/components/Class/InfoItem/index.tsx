import { Text, VStack } from "native-base";

type IProps = {
  title: string;
  info: string | number;
}

export function ClassInfoItem({ title, info }: IProps) {
  return (
    <VStack h={24} px={2}>
      <Text fontSize="xs" color="coolGray.400">{title}</Text>
      <Text fontSize="lg" ml={1}>{info}</Text>
    </VStack>
  )
}