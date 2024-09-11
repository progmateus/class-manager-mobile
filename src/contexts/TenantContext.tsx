import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { GetTenantProfileService } from "src/services/tenantsService";


export type TenantContextDataProps = {
  tenant: ITenantDTO;
  isLoadingTenantData: boolean;
  authenticateTenant: (tenantId: string) => Promise<void>;
}

type TenantContextProviderProps = {
  children: ReactNode;
}

export const TenantContext = createContext<TenantContextDataProps>({} as TenantContextDataProps);

export function TenantContextProvider({ children }: TenantContextProviderProps) {

  const [tenant, setTenant] = useState<ITenantDTO>({} as ITenantDTO);
  const [isLoadingTenantData, setIsLoadingTenantDate] = useState(false);


  async function authenticateTenant(tenantId: string) {
    setIsLoadingTenantDate(true);
    GetTenantProfileService(tenantId)
      .then(async ({ data: { data } }) => {
        if (data.id) {
          updateTenantProfile(data)
        }
      }).catch((err) => {
        console.log('err: ', err)
        return err
      }).finally(() => {
        setIsLoadingTenantDate(false);
      })
  }

  async function getTenantProfile(tenantId: string) {
    setIsLoadingTenantDate(true);
    GetTenantProfileService(tenantId).then(({ data }) => {
      if (data.data) {
        updateTenantProfile(data.data);
      }
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsLoadingTenantDate(false);
    })
  }

  async function updateTenantProfile(tenantUpdated: ITenantDTO) {
    setTenant(tenantUpdated);
  }

  useEffect(() => {
    if (tenant.id) {
      getTenantProfile(tenant.id)
    }
  }, [])

  return (
    <TenantContext.Provider value={{
      tenant,
      isLoadingTenantData,
      authenticateTenant
    }
    }>
      {children}
    </TenantContext.Provider>
  )
}