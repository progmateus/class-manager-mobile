import { ETargetType } from "src/enums/ETargetType";

interface IPaginationDTO {
  search?: string;
  page?: number;
  limit?: string;
}


interface IUserAndTenantPaginationDTO extends IPaginationDTO {
  userId?: string;
  tenantId?: string;
  targetTypes?: ETargetType[];
}

export { IUserAndTenantPaginationDTO, IPaginationDTO }

