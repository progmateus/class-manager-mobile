import { IUserAndTenantPaginationDTO } from "@dtos/shared/IPaginationDTO";
import { api } from "./api";


interface IListBookingsQuery extends IUserAndTenantPaginationDTO {
  classDayId?: string;
}

export function CreatebookingService(tenantId: string, classDayId: string, userId?: string) {
  return api({
    url: `${tenantId}/bookings/`,
    method: 'post',
    data: {
      userId,
      classDayId
    }
  })
}


export function DeleteBookingService(tenantId: string, bookingId: string, userId: string) {
  return api({
    url: `${tenantId}/bookings/${bookingId}`,
    method: 'delete',
    data: {
      userId
    }
  })
}


export function ListBookingsService({ page, userId, tenantId, classDayId }: IListBookingsQuery) {
  return api({
    url: 'bookings',
    method: 'get',
    params: {
      page,
      userId,
      tenantId,
      classDayId
    }
  })
}