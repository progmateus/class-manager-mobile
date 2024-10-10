import { IUserPreviewDTO } from "@dtos/users/IUserPreviewDTO";
import { IClassDTO } from "./IClassDTO";

interface ITeacherClassDTO {
  id: string;
  userId: string;
  clasId: string;
  user?: IUserPreviewDTO;
  class?: IClassDTO
}
export { ITeacherClassDTO }