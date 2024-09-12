import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { ISubscriptionDTO } from "../subscriptions/ISubscriptionDTO";
import { IUserDTO } from "../users/IUserDTO";
import { IRoleDTO } from "./IRoleDTO";
import { IUserCompletedDTO } from "@dtos/users/IUserCompletedDTO";

interface IUsersRolesDTO {
  userId: string;
  roleId: string;
  user: IUserCompletedDTO;
  role: IRoleDTO;
  tenant: ITenantDTO;
}
export { IUsersRolesDTO }