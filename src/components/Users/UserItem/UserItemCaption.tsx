import { Icon, Text, VStack } from "native-base";

type IUserItemContentProps = {
  caption: string
}

export function UserItemCaption({ caption }: IUserItemContentProps) {
  return (
    <Text fontSize="xs" color="coolGray.600"> {caption}</Text>
  )
}