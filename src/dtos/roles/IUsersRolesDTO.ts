import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { IRoleDTO } from "./IRoleDTO";
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";

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