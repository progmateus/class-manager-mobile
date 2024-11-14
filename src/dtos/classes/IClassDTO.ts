import { ITeacherClassDTO } from "./TeacherClassDTO";
import { ITenantPreviewDTO } from "@dtos/tenants/ITenantPreviewDTO";

export interface IClassDTO {
  id: string;
  name: string;
  tenantId: string;
  tenant?: ITenantPreviewDTO;
  timeTableId: string;
  teachersClasses: ITeacherClassDTO[];
  timetable: any;
  description: string;
  createdAt: string;
  updatedAt: string;
}