import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { ITeacherClassDTO } from "./TeacherClassDTO";

export interface IClassDTO {
  id: string;
  name: string;
  tenantId: string;
  tenant?: ITenantDTO;
  businessHour: string;
  teachersClasses: ITeacherClassDTO[];
  description: string;
  createdAt: string;
  updatedAt: string;
}