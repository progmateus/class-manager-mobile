import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { IClassDTO } from "./IClassDTO";

interface IStudentClassDTO {
  id: string;
  userId: string;
  classId: string;
  user?: IUserPreviewDTO;
  class?: IClassDTO
}
export { IStudentClassDTO }