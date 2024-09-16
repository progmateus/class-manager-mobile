import { IClassDTO } from "./IClass";
import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";

interface IUserClassDTO {
  id: string;
  tenantId: string;
  classId: string;
  userId?: string;
  teacherId?: string;
  user?: IUserPreviewDTO;
  class: IClassDTO;
}

export { IUserClassDTO }