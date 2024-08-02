import { Icon, Text, VStack } from "native-base";

type IMenuItemContentProps = {
  title: string
  description: string
}

export function MenuItemContent({ title, description }: IMenuItemContentProps) {
  return (
    <VStack flex={1}>
      <Text fontSize="md"> {title}</Text>
      <Text fontSize="xs" color="coolGray.700"> {description}</Text>
    </VStack>
  )
}