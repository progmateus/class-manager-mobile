import { Input as NativeBaseInput, IInputProps, FormControl, Text, VStack } from "native-base";
import { StyleProp, TextStyle } from "react-native";
import { TextInputMask, TextInputMaskProps } from "react-native-masked-text";
import { THEME } from "src/theme";

type Props = TextInputMaskProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  label?: string;
}

export function InputMask({ errorMessage = null, isInvalid = false, label, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;

  const { sizes, colors } = THEME;

  const defaultStyle: StyleProp<TextStyle> = {
    width: '100%',
    borderBottomColor: 'red',
    color: colors.coolGray[700],
    height: sizes[10],
    borderColor: colors.coolGray[300],
    borderWidth: 0.8,
    borderRadius: 4,
    paddingLeft: sizes[4]
  }

  return (
    <FormControl isInvalid={invalid} flex={1}>
      <VStack space={1.5}>
        {label && (<Text fontSize="sm" fontWeight="medium" color="coolGray.700"> {label} </Text>)}
        <TextInputMask
          style={defaultStyle}
          {...rest}
        />
        {errorMessage && (<Text fontSize="sm" fontWeight="medium" color="danger.500"> {errorMessage}</Text>)}
      </VStack>
    </FormControl>
  );
}