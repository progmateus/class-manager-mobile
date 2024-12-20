import { Avatar } from "@components/Avatar/Avatar";

type IProps = {
  url?: string;
  alt?: string;
}
export function GenericItemAvatar({ url, alt = "Imagem" }: IProps) {
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