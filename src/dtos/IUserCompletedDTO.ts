import { IClassDTO } from "./IClass";
import { IUserClassDTO } from "./IUserClassDTO";

interface IUserCompletedDTO {
  id: string;
  name: {
    firstName: string;
    lastName?: string;
  };
  username: string;
  email: {
    address: string;
  };
  document: {
    number: string;
  }
  avatar: string;
  studentsClasses: IUserClassDTO[];
  address: IAddressDTO;
  phone: string;
}
export { IUserCompletedDTO }