import { Button, IButtonProps, Icon } from "native-base";
import { ElementType } from "react";



type IUserItemActionProps = IButtonProps & {
  icon: ElementType;
}

export function UserItemAction({ icon, ...rest }: IUserItemActionProps) {
  return (
    <Button variant="unstyled" {...rest}>
      <Icon as={icon} color="coolGray.400" />
    </Button>
  )
}