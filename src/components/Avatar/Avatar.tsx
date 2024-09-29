import { IAvatarProps, Avatar as NativeBaseAvatar } from "native-base";
import BlankProfileImage from "@assets/blank-profile.png"
import { Image } from "react-native";



type IProps = IAvatarProps & {
  src?: string;
  alt?: string;
  type?: "user" | "tenant"
  username?: string;
}


export function Avatar({ src, alt = "Imagem", type = "user", username, ...rest }: IProps) {
  let finalSrc = "";

  finalSrc = src ? src : Image.resolveAssetSource(BlankProfileImage).uri;

  if (type === "user" && !src && username) {
    finalSrc = `https://raw.githubusercontent.com/progmateus/avatars/refs/heads/main/assets/${username}.png`
  }

  console.log(finalSrc)

  return (
    <NativeBaseAvatar
      rounded="full"
      w={10}
      h={10}
      mr={4}
      bgColor="brand.500"
      {...rest}
      source={{
        uri: finalSrc
      }}
    />
  )
}