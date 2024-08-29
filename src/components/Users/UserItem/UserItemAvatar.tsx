import { Image, View } from "native-base";
import { UserCircle, UserCircleGear } from "phosphor-react-native";

type IProps = {
  url: string;
  alt: string;
}
export function UserItemAvatar({ url, alt = "Imagem" }: IProps) {
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
          <View mr={2}>
            <UserCircle size={48} weight="light" />
          </View>
      }
    </>
  )
}