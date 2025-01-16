import { IInvoiceDTO } from "@dtos/invoices/IInvoiceDTO";
import { ITenantDTO } from "@dtos/tenants/ITenantDTO";

interface IPlanDTO {
  id: string;
  name: string;
  description: string;
  studentsLimit: number;
  classesLimit: number;
  price: number;
  tenants: ITenantDTO[];
  invoices: IInvoiceDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export { IPlanDTO }