import { ITimeTableDTO } from "@dtos/timeTables/ITimeTableDTO";
import { ITeacherClassDTO } from "./TeacherClassDTO";
import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { IAddressDTO } from "@dtos/shared/IAddressDTO";

export interface IClassDTO {
  id: string;
  name: string;
  tenantId: string;
  tenant?: ITenantDTO;
  timeTableId?: string;
  addressId?: string;
  teachersClasses: ITeacherClassDTO[];
  timetable: ITimeTableDTO;
  address: IAddressDTO;
  description: string;
  createdAt: string;
  updatedAt: string;
}