import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { IRoleDTO } from "./IRoleDTO";
import { IUserCompletedDTO } from "@dtos/users/IUserCompletedDTO";

interface IUsersRolesDTO {
  id: string;
  userId: string;
  roleId: string;
  user: IUserCompletedDTO;
  role: IRoleDTO;
  tenant: ITenantDTO;
}
export { IUsersRolesDTO }