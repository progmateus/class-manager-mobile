import { Icon, Text, VStack } from "native-base";

type IUserItemContentProps = {
  title: string
}

export function UserItemTitle({ title }: IUserItemContentProps) {
  return (
    <Text fontSize="md"> {title}</Text>
  )
}