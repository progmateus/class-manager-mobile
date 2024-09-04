import { ISubscriptionDTO } from "./ISubscriptionDTO";

interface IUserDTO {
  id: string;
  name?: string;
  firstname?: string;
  lastName?: string;
  document?: string;
  email?: string
  password?: string;
  avatar: string;
  roles?: []
  subscriptions?: ISubscriptionDTO[];
}
export { IUserDTO }