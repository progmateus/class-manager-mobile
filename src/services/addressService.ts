import { IAddressDTO } from "@dtos/shared/IAdressDTO";
import { api } from "./api";

export function CreateTenantAddressService({ street, city, state, tenantId }: IAddressDTO) {
  return api({
    url: `${tenantId}/addresses`,
    method: 'post',
    data: {
      street,
      city,
      state,
      tenantId
    }
  })
}

export function DeleteAddressService(addressId: string) {
  return api({
    url: `addresses${addressId}`,
    method: 'delete'
  })
}

export function UpdateUserAddressService(tenantId: string) {
  return api({
    url: `${tenantId}/address`,
    method: 'get'
  })
}

export function ListTenantAddressesService({ street, city, state }: IAddressDTO) {
  return api({
    url: 'users/address',
    method: 'patch',
    data: {
      street,
      city,
      state
    }
  })
}

export function UpdateClassAddressService(tenantId: string, classId: string, { street, city, state }: IAddressDTO,) {
  return api({
    url: `${tenantId}/classes/${classId}/address`,
    method: 'patch',
    data: {
      street,
      city,
      state,
      tenantId
    }
  })
}