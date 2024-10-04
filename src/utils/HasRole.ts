import { IUsersRolesDTO } from "@dtos/roles/IUsersRolesDTO"

export const HasRole = (usersRoles: IUsersRolesDTO[], tenantId: string, rolesNames: string[]) => {
  return !!usersRoles.some(ur => ur.tenantId == tenantId && rolesNames.includes((ur.role.name)))
}