import { api } from "./api";

export function ListInvoicesService(tenantId?: string, userId?: string) {
  return api({
    url: 'invoices/',
    method: 'get',
    data: {
      tenantId,
      userId
    }
  })
}