import { api } from "./api";

export function ListInvoicesService({ userId, tenantId, page }: IUserAndTenantPaginationDTO) {
  return api({
    url: 'invoices/',
    method: 'get',
    data: {
      tenantId,
      userId,
      page
    }
  })
}