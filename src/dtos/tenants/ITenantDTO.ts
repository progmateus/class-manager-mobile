import { EdocumentType } from "src/enums/EDocumentType";
import { ETenantStatus } from "src/enums/ETenantStatus";
import { ILinkDTO } from "./ILinkDTO";
import { ESubscriptionStatus } from "src/enums/ESubscriptionStatus";
import { IImageDTO } from "./IImageDTO";
import { IExternalBankAccountDTO } from "./IExternalBankAccountDTO";

interface ITenantDTO {
  id: string;
  name: string;
  document: string;
  documentType: EdocumentType;
  status: ETenantStatus;
  subscriptionStatus: ESubscriptionStatus;
  StripeOnboardUrl?: number;
  AvailableBalance?: number;
  email: string;
  username: string;
  avatar: string;
  links: ILinkDTO[];
  images: IImageDTO[];
  externalsBanksAccounts: IExternalBankAccountDTO[];
  description?: string;
  stripeChargesEnabled: boolean;
  stripeOnboardUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export { ITenantDTO }