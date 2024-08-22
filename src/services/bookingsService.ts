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