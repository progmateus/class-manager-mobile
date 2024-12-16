import { api } from "./api";

export function ListInvoicesService({ userId, tenantId, page, subscriptionId }: IUserAndTenantPaginationDTO) {
  return api({
    url: 'invoices/',
    method: 'get',
    params: {
      tenantId,
      userId,
      page,
      subscriptionId
    }
  })
}