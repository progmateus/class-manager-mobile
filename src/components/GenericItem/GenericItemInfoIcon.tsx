import { Icon } from "native-base"
import { ElementType } from "react"

type IProps = {
  icon: ElementType,
  color?: string;
}

export function GenericItemInfoIcon({ icon, color = "coolGray.400" }: IProps) {
  return (
    <Icon as={icon} color={color} />
  )
}