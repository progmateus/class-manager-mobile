import { Icon } from "native-base"
import { ElementType } from "react"

type IProps = {
  icon: ElementType
}
export function GenericItemIcon({ icon }: IProps) {
  return (
    <Icon mr={6} as={icon} color="brand.500" size={20} />
  )
}