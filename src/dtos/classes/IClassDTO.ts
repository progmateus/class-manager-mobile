import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { ITeacherClassDTO } from "./TeacherClassDTO";

export interface IClassDTO {
  id: string;
  name: string;
  tenantId: string;
  tenant?: ITenantDTO;
  timeTableId: string;
  teachersClasses: ITeacherClassDTO[];
  timetable: any;
  description: string;
  createdAt: string;
  updatedAt: string;
}