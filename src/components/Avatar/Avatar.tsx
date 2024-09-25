import { IAvatarProps, Avatar as NativeBaseAvatar } from "native-base";
import BlankProfileImage from "@assets/blank-profile.png"
import { Image } from "react-native";



type IProps = IAvatarProps & {
  url?: string;
  alt?: string;
  type?: "user" | "tenant"
}

const DEFAULT_IMAGE = Image.resolveAssetSource(BlankProfileImage).uri;

export function Avatar({ url, alt = "Imagem", type = "user", ...rest }: IProps) {
  return (
    <NativeBaseAvatar
      rounded="full"
      w={10}
      h={10}
      mr={4}
      {...rest}
      source={{
        uri: url ? url : DEFAULT_IMAGE,
      }}
    />
  )
}