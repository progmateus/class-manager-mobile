import { IRoleDTO } from "./IRoleDTO";
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { ITenantPreviewDTO } from "@dtos/tenants/ITenantPreviewDTO";

interface IUsersRolesDTO {
  id: string;
  userId: string;
  roleId: string;
  tenantId: string;
  user: IUserPreviewDTO;
  role: IRoleDTO;
  tenant: ITenantPreviewDTO;
}
export { IUsersRolesDTO }