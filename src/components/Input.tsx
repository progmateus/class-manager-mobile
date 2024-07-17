import { Input as NativeBaseInput, IInputProps, FormControl, Text, VStack } from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  label?: string;
}

export function Input({ errorMessage = null, isInvalid = false, label, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid}>
      <VStack space={1.5}>
        {label && (<Text fontSize="sm" fontWeight="medium" color="coolGray.700"> Nome </Text>)}
        <NativeBaseInput
          bg="coolGray.100"
          h={10}
          px={4}
          borderWidth={0}
          isInvalid={invalid}
          fontSize="md"
          color="white"
          fontFamily="body"
          placeholderTextColor="coolGray.400"
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
        {errorMessage && (<Text fontSize="sm" fontWeight="medium" color="danger.500"> {errorMessage}</Text>)}
      </VStack>
    </FormControl>
  );
}