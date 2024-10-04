import { Heading, Text, VStack } from "native-base"
type IProps = {
  title: string;
  caption: string;
}
export function GenericItemContent({ title, caption }: IProps) {
  return (
    <VStack flex={1} space={1}>
      <Text textTransform="-moz-initial" fontSize="md" color="coolGray.900"> {title}</Text>
      <Text fontSize="xs" color="coolGray.500"> {caption}</Text>
    </VStack>
  )
}