import { IAddressDTO } from "@dtos/shared/IAddressDTO";
import { api } from "./api";

export function CreateTenantAddressService({ street, city, state, tenantId, number }: Pick<IAddressDTO, "street" | "city" | "state" | "tenantId" | "number">) {
  return api({
    url: `${tenantId}/addresses`,
    method: 'post',
    data: {
      street,
      city,
      state,
      number,
      tenantId
    }
  })
}

export function DeleteAddressService(addressId: string) {
  return api({
    url: `addresses/${addressId}`,
    method: 'delete'
  })
}

export function UpdateUserAddressService(tenantId: string) {
  return api({
    url: `${tenantId}/addresses`,
    method: 'get'
  })
}

export function ListTenantAddressesService(tenantId: string) {
  return api({
    url: `${tenantId}/addresses`,
    method: 'get'
  })
}

export function UpdateClassAddressService(tenantId: string, classId: string, { street, city, state }: IAddressDTO,) {
  return api({
    url: `${tenantId}/classes/${classId}/addresses`,
    method: 'patch',
    data: {
      street,
      city,
      state,
      tenantId
    }
  })
}