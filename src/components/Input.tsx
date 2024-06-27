import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
  isInvalid?: boolean
}

export function Input({ errorMessage = null, isInvalid = false, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput
        bg="blueGray.100"
        h={10}
        px={4}
        borderWidth={0}
        isInvalid={invalid}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        _focus={{
          borderWidth: 1,
          borderColor: 'brand.500'
        }}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500'
        }}
        {...rest}
      />
    </FormControl>
  );
}