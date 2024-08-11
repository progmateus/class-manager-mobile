import { Heading, Text, VStack } from "native-base"
type IProps = {
  title: string;
  caption: string;
}
export function GenericItemContent({ title, caption }: IProps) {
  return (
    <VStack flex={1}>
      <Heading numberOfLines={1} fontFamily="heading" fontSize="sm"> {title} </Heading>
      <Text numberOfLines={1} color="gray.400" fontSize="xs"> {caption}</Text>
    </VStack>
  )
}