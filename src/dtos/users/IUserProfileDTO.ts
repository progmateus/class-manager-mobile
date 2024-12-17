import { ISubscriptionPreviewDTO } from "@dtos/subscriptions/ISubscriptionPreviewDTO";
import { IUsersRolesDTO } from "../roles/IUsersRolesDTO";
import { IStudentClassDTO } from "@dtos/classes/IStudentClassDTO";
import { ITeacherClassDTO } from "@dtos/classes/TeacherClassDTO";
import { IAddressDTO } from "@dtos/shared/IAddressDTO";

interface IUserProfileDTO {
  id: string;
  name: string;
  username: string;
  document?: string;
  email?: string
  phone?: string;
  avatar?: string;
  roles?: []
  addressId?: string;
  subscriptions?: ISubscriptionPreviewDTO[];
  usersRoles: IUsersRolesDTO[];
  studentsClasses: IStudentClassDTO[];
  teachersClasses: ITeacherClassDTO[];
  address: IAddressDTO;
}
export { IUserProfileDTO }