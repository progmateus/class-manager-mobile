import { ITimeTableDTO } from "@dtos/timeTables/ITimeTableDTO";
import { ITeacherClassDTO } from "./TeacherClassDTO";
import { ITenantPreviewDTO } from "@dtos/tenants/ITenantPreviewDTO";
import { IAddressDTO } from "@dtos/shared/IAddressDTO";

export interface IClassDTO {
  id: string;
  name: string;
  tenantId: string;
  tenant?: ITenantPreviewDTO;
  timeTableId?: string;
  addressId?: string;
  teachersClasses: ITeacherClassDTO[];
  timetable: ITimeTableDTO;
  address: IAddressDTO;
  description: string;
  createdAt: string;
  updatedAt: string;
}