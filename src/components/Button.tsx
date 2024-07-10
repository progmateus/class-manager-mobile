import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  variant?: "solid" | "outline";
  fontSize?: string;
}

export function Button({ title, variant = "solid", fontSize = "sm", ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={12}
      bg={variant === "outline" ? "transparent" : "brand.600"}
      borderWidth={variant === "outline" ? 1 : 0}
      rounded="xl"
      _pressed={{
        bg: variant === "outline" ? "coolGray.100" : "brand.500",
      }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "brand.600" : "white"}
        fontFamily="heading"
        fontSize={fontSize}
      >
        {title}
      </Text>

    </NativeBaseButton>
  );
}