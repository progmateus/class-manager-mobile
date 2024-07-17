import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  variant?: "solid" | "outline";
  fontSize?: string;
}

export function Button({ title, variant = "solid", fontSize = "sm", ...rest }: Props) {
  const { color, bg, bgColor, backgroundColor, background } = rest
  const useBgProp = bg || bgColor || backgroundColor || background;
  const definedColor = color ? color : variant === "outline" ? "brand.600" : "white";
  const definedBg = useBgProp ? useBgProp : variant === "outline" ? "transparent" : "brand.600";
  return (
    <NativeBaseButton
      w="full"
      h={12}
      bg={definedBg}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor={variant === "outline" ? definedColor : "transparent"}
      rounded="xl"
      _pressed={{
        bg: variant === "outline" ? "coolGray.100" : definedBg,
      }}
      {...rest}
    >
      <Text
        color={definedColor}
        fontFamily="heading"
        fontSize={fontSize}
      >
        {title}
      </Text>

    </NativeBaseButton>
  );
}