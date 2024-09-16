import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO";
import { IUsersRolesDTO } from "../roles/IUsersRolesDTO";
import { IStudentClassDTO } from "@dtos/classes/IStudentClassDTO";
import { ITeacherClassDTO } from "@dtos/classes/TeacherClassDTO";

interface IUserPreviewDTO {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  username: string;
  document?: string;
  avatar?: string;
  roles?: []
  subscriptions?: ISubscriptionPreviewDTO[];
  usersRoles?: IUsersRolesDTO[];
  studentsClasses?: IStudentClassDTO[];
  teachersClasses?: ITeacherClassDTO[];
}
export { IUserPreviewDTO }