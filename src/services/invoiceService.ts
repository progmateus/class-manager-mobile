import { EInvoiceStatus } from "src/enums/EInvoiceStatus";
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

export function UpdateInvoiceStatusService(tenantId: string, invoiceId: string, status: EInvoiceStatus) {
  console.log("ENTROUUUUUU")
  console.log(status)
  return api({
    url: `${tenantId}/invoices/${invoiceId}/status`,
    method: 'patch',
    data: {
      status
    }
  })
}