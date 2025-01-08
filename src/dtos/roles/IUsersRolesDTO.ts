import { IRoleDTO } from "./IRoleDTO";
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { ITenantDTO } from "@dtos/tenants/ITenantDTO";

interface IUsersRolesDTO {
  id: string;
  userId: string;
  roleId: string;
  tenantId: string;
  user: IUserPreviewDTO;
  role: IRoleDTO;
  tenant: ITenantDTO;
}
export { IUsersRolesDTO }