import { IClassDTO } from "./IClass";
import { IUserCompletedDTO } from "./IUserCompletedDTO";

interface IUserClassDTO {
  id: string;
  tenantId: string;
  classId: string;
  userId?: string;
  teacherId?: string;
  user?: IUserCompletedDTO;
  class?: IClassDTO;
}

export { IUserClassDTO }