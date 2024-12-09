import { Input as NativeBaseInput, IInputProps, FormControl, Text, VStack } from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  label?: string;
}

export function Input({ errorMessage = null, isInvalid = false, label, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;

  const { color, bg, bgColor, backgroundColor, background, variant } = rest

  const definedBg = variant && variant !== "filled" ? "transparent" : bg || bgColor || backgroundColor || background || "coolGray.100";
  const definedColor = color ? color : variant !== "filled" ? "coolGray.800" : "white"

  return (
    <FormControl isInvalid={invalid} flex={1}>
      <VStack space={1.5}>
        {label && (<Text fontSize="sm" fontWeight="medium" color="coolGray.700"> {label} </Text>)}
        <NativeBaseInput
          bg={definedBg}
          h={10}
          px={4}
          isInvalid={invalid}
          borderWidth={variant && variant !== "filled" ? 1 : 0}
          fontSize="md"
          color={definedColor}
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