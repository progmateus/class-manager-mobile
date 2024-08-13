import { Text } from "native-base";

type IProps = {
  text: string;
}
export function GenericItemInfoValue({ text }: IProps) {
  return (
    <Text numberOfLines={1} color="coolGray.500" fontSize="xs"> {text}</Text>
  )
}