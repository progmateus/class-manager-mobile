import { Icon } from "native-base"
import { ElementType } from "react"

type IProps = {
  icon: ElementType,
  color?: string;
}
export function GenericItemIcon({ icon, color = 'coolGray.700' }: IProps) {
  return (
    <Icon mr={6} as={icon} color={color} size={20} />
  )
}