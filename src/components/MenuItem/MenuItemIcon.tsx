import { Icon } from "native-base";
import { ElementType } from "react";

type IMenuItemIconProps = {
  icon: ElementType
}

export function MenuItemIcon({ icon }: IMenuItemIconProps) {
  return (
    <Icon mr={6} as={icon} color="brand.500" size={20} />
  )
}