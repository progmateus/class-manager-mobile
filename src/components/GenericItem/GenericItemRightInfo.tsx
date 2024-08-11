import { Text } from "native-base";

type IProps = {
  text: string;
}
export function GenericItemRightInfo({ text }: IProps) {
  return (
    <Text numberOfLines={1} color="gray.400" fontSize="xs"> {text}</Text>
  )
}