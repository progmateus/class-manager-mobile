export const GetRole = (roles: IRoleDTO[], tenantId: string, roleName: string) => {
  return !!roles.find((r) => r.tenantId === tenantId && r.role.name === roleName)
}