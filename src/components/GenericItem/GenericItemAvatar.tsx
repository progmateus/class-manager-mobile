import { Image } from "native-base";

type IProps = {
  url: string;
}
export function GenericItemAvatar({ url }: IProps) {
  return (
    <Image
      rounded="md"
      w={12}
      h={12}
      alt="teste"
      mr={4}
      source={{
        uri: url,
      }}
      defaultSource={{ uri: url }}
    />
  )
}