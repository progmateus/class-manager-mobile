import { IAvatarProps, Avatar as NativeBaseAvatar } from "native-base";
import BlankProfileImage from "@assets/blank-profile.png"
import { Image } from "react-native";



type IProps = IAvatarProps & {
  src?: string;
  alt?: string;
  type?: "user" | "tenant"
}

const DEFAULT_IMAGE = Image.resolveAssetSource(BlankProfileImage).uri;

export function Avatar({ src, alt = "Imagem", type = "user", ...rest }: IProps) {
  console.log(src)
  return (
    <NativeBaseAvatar
      rounded="full"
      w={10}
      h={10}
      mr={4}
      bgColor="brand.500"
      {...rest}
      source={{
        uri: src ? src : DEFAULT_IMAGE,
      }}
    />
  )
}