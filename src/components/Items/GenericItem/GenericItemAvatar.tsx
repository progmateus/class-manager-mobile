import { Avatar } from "@components/Avatar/Avatar";
import { Image } from "native-base";
import { UserCircle } from "phosphor-react-native";

type IProps = {
  url?: string;
  alt?: string;
  username: string;
}
export function GenericItemAvatar({ url, alt = "Imagem", username }: IProps) {
  return (
    <Avatar
      rounded="full"
      w={12}
      h={12}
      alt={alt}
      mr={4}
      src={url}
    />
  )
}