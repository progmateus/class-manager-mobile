import { IAvatarProps, IImageProps, Image, Avatar as NativeBaseAvatar } from "native-base";
import BlankProfileImage from "@assets/blank-profile.png"
import { Image as ReactImage } from "react-native";



type IProps = IImageProps & {
  src?: string;
  alt?: string;
  type?: "user" | "tenant"
  username?: string;
}


export function Avatar({ src, alt = "Imagem", type = "user", username, ...rest }: IProps) {
  let finalSrc = "";

  finalSrc = src ? src : ReactImage.resolveAssetSource(BlankProfileImage).uri;

  if (type === "user" && !src && username) {
    finalSrc = `https://raw.githubusercontent.com/progmateus/avatars/refs/heads/main/assets/${username}.png`
  }

  return (
    <Image
      rounded="full"
      alt={alt}
      w={10}
      h={10}
      {...rest}
      source={{
        uri: finalSrc
      }}
      defaultSource={{ uri: finalSrc }}
    />
  )
}