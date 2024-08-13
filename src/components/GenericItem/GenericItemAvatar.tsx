import { Image } from "native-base";

type IProps = {
  url: string;
  alt: string;
}
export function GenericItemAvatar({ url, alt = "Imagem" }: IProps) {
  return (
    <Image
      rounded="md"
      w={12}
      h={12}
      alt={alt}
      mr={4}
      source={{
        uri: url,
      }}
      defaultSource={{ uri: url }}
    />
  )
}