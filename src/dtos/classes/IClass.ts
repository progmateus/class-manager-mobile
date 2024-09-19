import { ITenantDTO } from "@dtos/tenants/ITenantDTO";

export interface IClassDTO {
  id: string;
  name: string;
  tenantId: string;
  tenant?: ITenantDTO;
  businessHour: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}