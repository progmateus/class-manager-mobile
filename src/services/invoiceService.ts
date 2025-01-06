import { EInvoiceStatus } from "src/enums/EInvoiceStatus";
import { api } from "./api";
import { IUserAndTenantPaginationDTO } from "@dtos/shared/IPaginationDTO";

export function ListInvoicesService({ userId, tenantId, page, subscriptionId, targetTypes }: IUserAndTenantPaginationDTO) {
  return api({
    url: 'invoices/',
    method: 'get',
    params: {
      tenantId,
      userId,
      page,
      subscriptionId,
      targetTypes
    },
    paramsSerializer: {
      indexes: true
    }
  })
}

export function UpdateInvoiceStatusService(tenantId: string, invoiceId: string, status: EInvoiceStatus) {
  return api({
    url: `${tenantId}/invoices/${invoiceId}/status`,
    method: 'patch',
    data: {
      status
    }
  })
}