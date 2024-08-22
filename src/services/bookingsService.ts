import { api } from "./api";

export function CreatebookingService(tenantId: string, classDayId: string, userId: string) {
  return api({
    url: `${tenantId}/bookings/`,
    method: 'post',
    data: {
      userId,
      classDayId
    }
  })
}


export function DeleteBookingService(tenantId: string, bookingId: string, classDayId: string, userId: string) {
  return api({
    url: `${tenantId}/bookings/${bookingId}`,
    method: 'delete',
    data: {
      classDayId,
      userId
    }
  })
}