import { ISubscriptionDTO } from "../subscriptions/ISubscriptionDTO";
import { IUsersRolesDTO } from "../roles/IUsersRolesDTO";

interface IUserDTO {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  username: string;
  document?: string;
  email?: string
  phone?: string;
  password?: string;
  avatar?: string;
  roles?: []
  subscriptions?: ISubscriptionDTO[];
  usersRoles?: IUsersRolesDTO[];
}
export { IUserDTO }