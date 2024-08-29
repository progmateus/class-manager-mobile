import { Icon } from "native-base";
import { ElementType } from "react";

type IUserItemIconProps = {
  icon: ElementType
}

export function UserItemIcon({ icon }: IUserItemIconProps) {
  return (
    <Icon mr={6} as={icon} color="brand.500" size={20} />
  )
}