import { ETargetType } from "src/enums/ETargetType";

interface IPaginationDTO {
  search?: string;
  page?: number;
}


interface IUserAndTenantPaginationDTO extends IPaginationDTO {
  userId?: string;
  tenantId?: string;
  subscriptionId?: string;
  targetTypes?: ETargetType[];
}

export { IUserAndTenantPaginationDTO, IPaginationDTO }

