import { IAvatarProps, IImageProps, Image, Avatar as NativeBaseAvatar } from "native-base";
import BlankProfileImage from "@assets/blank-profile.png"
import { Image as ReactImage } from "react-native";
import { useRef } from "react";
import { InterfaceImageProps } from "native-base/lib/typescript/components/primitives/Image/types";



type IProps = IImageProps & {
  src?: string;
  alt?: string;
  type?: "user" | "tenant"
  username?: string;
}


export function Avatar({ src, alt = "Imagem", type = "user", username, ...rest }: IProps) {
  const imageRef = useRef<InterfaceImageProps>({} as InterfaceImageProps)
  let finalSrc = "";
  let localSrc = ReactImage.resolveAssetSource(BlankProfileImage).uri
  finalSrc = src ? `http://192.168.15.9:5062/images/${src}` : localSrc;

  /*   if (type === "user" && !src && username) {
      finalSrc = `https://raw.githubusercontent.com/progmateus/avatars/refs/heads/main/assets/${username}.png`
    } */


  return (
    <Image
      rounded="full"
      ref={imageRef}
      alt={alt}
      w={10}
      h={10}
      {...rest}
      source={{
        uri: finalSrc
      }}
      fallbackSource={{
        uri: localSrc
      }}
      defaultSource={{ uri: localSrc }}
    />
  )
}