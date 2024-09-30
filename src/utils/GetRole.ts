import { IUsersRolesDTO } from "@dtos/roles/IUsersRolesDTO"

export const GetRole = (usersRoles: IUsersRolesDTO[], tenantId: string, roleName: string) => {
  return !!usersRoles.find((r) => r.tenantId === tenantId && r.role.name === roleName)
}