import { Button, IButtonProps, Icon } from "native-base";
import { ElementType } from "react";



type IMenuItemActionProps = IButtonProps & {
  icon: ElementType;
}

export function MenuItemAction({ icon, ...rest }: IMenuItemActionProps) {
  return (
    <Button variant="unstyled" {...rest}>
      <Icon as={icon} color="coolGray.400" />
    </Button>
  )
}