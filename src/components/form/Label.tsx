import { Input as NativeBaseInput, IInputProps, FormControl, Text, VStack } from "native-base";

type Props = {
  text: string
}

export function Label({ text }: Props) {
  return (
    <Text fontSize="sm" fontWeight="medium" color="coolGray.700"> {text} </Text>
  );
}