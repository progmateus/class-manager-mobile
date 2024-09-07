import { ISubscriptionDTO } from "./ISubscriptionDTO";

interface IUserDTO {
  id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  document?: string;
  email?: string
  phone?: string;
  password?: string;
  avatar?: string;
  roles?: []
  subscriptions?: ISubscriptionDTO[];
}
export { IUserDTO }