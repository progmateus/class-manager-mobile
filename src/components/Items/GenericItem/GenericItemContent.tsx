import { Heading, Text, VStack } from "native-base"
type IProps = {
  title?: string;
  caption?: string;
}
export function GenericItemContent({ title, caption }: IProps) {
  return (
    <VStack flex={1} space={1}>
      {title && <Text textTransform="capitalize" fontSize="md" color="coolGray.900"> {title}</Text>}
      {caption && <Text fontSize="xs" color="coolGray.500"> {caption}</Text>}
    </VStack>
  )
}