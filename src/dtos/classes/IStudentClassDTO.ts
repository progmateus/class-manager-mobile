import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { IClassDTO } from "./IClass";

interface IStudentClassDTO {
  id: string;
  userId: string;
  clasId: string;
  user?: IUserPreviewDTO;
  class?: IClassDTO
}
export { IStudentClassDTO }