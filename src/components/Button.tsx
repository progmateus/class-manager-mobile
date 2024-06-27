import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  variant?: "solid" | "outline";
}

export function Button({ title, variant = "solid", ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={12}
      bg={variant === "outline" ? "transparent" : "brand.500"}
      borderWidth={variant === "outline" ? 1 : 0}
      rounded="xl"
      _pressed={{
        bg: variant === "outline" ? "blueGray.100" : "brand.400",
      }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "brand.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}