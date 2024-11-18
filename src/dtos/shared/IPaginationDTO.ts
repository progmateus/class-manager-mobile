interface IPaginationDTO {
  search?: string;
  page?: number;
}


interface IUserAndTenantPaginationDTO extends IPaginationDTO {
  userId?: string;
  tenantId?: string;
}