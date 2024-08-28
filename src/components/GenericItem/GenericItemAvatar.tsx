import { Image } from "native-base";
import { UserCircle } from "phosphor-react-native";

type IProps = {
  url: string;
  alt: string;
}
export function GenericItemAvatar({ url, alt = "Imagem" }: IProps) {
  return (
    <>
      {
        url ?
          (
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
          ) :
          (
            <UserCircle size={48} weight="light" />
          )
      }
    </>
  )
}