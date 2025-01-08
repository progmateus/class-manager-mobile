import { ITenantDTO } from "@dtos/tenants/ITenantDTO"
import { IUserProfileDTO } from "@dtos/users/IUserProfileDTO";

export type IAddressDTO = {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  number?: string;
  zipCode?: string;
  userId?: string;
  tenantId?: string;
  tenant?: ITenantDTO;
  user?: IUserProfileDTO;
}