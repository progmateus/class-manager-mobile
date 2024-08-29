import { IUserCompletedDTO } from "./IUserCompletedDTO";

export type IUserRoleDTO = {
  id: string;
  userId: string;
  roleId: string;
  user: IUserCompletedDTO;
  role: any;
}