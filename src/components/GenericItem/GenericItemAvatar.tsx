import { Avatar } from "@components/Avatar/Avatar";
import { Image } from "native-base";
import { UserCircle } from "phosphor-react-native";

type IProps = {
  url?: string;
  alt?: string;
}
export function GenericItemAvatar({ url, alt = "Imagem" }: IProps) {
  return (
    <Avatar
      rounded="md"
      w={12}
      h={12}
      alt={alt}
      mr={4}
      source={{
        uri: url,
      }}
    />
  )
}