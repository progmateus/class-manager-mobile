import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { api } from "src/services/api";
import { storageUserRemove, storageUserSave } from "@storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { SignInService } from "src/services/authService";
import { GetUserProfileService } from "src/services/usersService";
import { IUserProfileDTO } from "@dtos/users/IUserProfileDTO";
import { GetTenantProfileService } from "src/services/tenantsService";
import { ITenantDTO } from "@dtos/tenants/ITenantDTO";
import { storageAuthenticationTypeGet, storageAuthenticationTypeRemove, storageAuthenticationTypeSave } from "@storage/storageAuthenticationType";
import { storageTenantGet, storageTenantRemove, storageTenantSave } from "@storage/storageTenant";


export type AuthContextDataProps = {
  user: IUserProfileDTO;
  tenant: ITenantDTO;
  authenticationType: "user" | "tenant";
  isLoadingData: boolean;
  singIn: (email: string, password: string) => Promise<void>;
  userUpdate: (userUpdated: IUserProfileDTO) => Promise<void>;
  tenantUpdate: (tenantData: ITenantDTO) => Promise<void>;
  signOut: () => Promise<void>;
  authenticateTenant: (tenantId: string) => Promise<void>;
  signOutTenant: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<IUserProfileDTO>({} as IUserProfileDTO);
  const [tenant, setTenant] = useState<ITenantDTO>({} as ITenantDTO);
  const [authenticationType, setAuthenticationType] = useState<"user" | "tenant">("user");
  const [isLoadingData, setIsLoadingData] = useState(true);

  function tokenUpdate(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async function userUpdate(userData: IUserProfileDTO) {
    setUser(prevState => { return { ...prevState, ...userData } });
    await storageUserSave(userData);
  }

  async function tenantUpdate(tenantData: ITenantDTO) {
    setTenant(prevState => { return { ...prevState, ...tenantData } });
    await storageTenantSave(tenantData);
  }

  async function authenticationTypeUpdate(type: "tenant" | "user") {
    setAuthenticationType(type)
    await storageAuthenticationTypeSave(type);
  }

  async function singIn(email: string, password: string) {
    setIsLoadingData(true);
    SignInService(email, password)
      .then(async ({ data: { data } }) => {
        if (data.id) {
          const { user: userResponse, token, refresh_token } = data
          await storageAuthTokenSave({ token, refresh_token });
          tokenUpdate(token);
          userUpdate(userResponse);
        }
      }).catch((err) => {
        console.log('err: ', err)
        return err
      }).finally(() => {
        setIsLoadingData(false);
      })
  }

  async function signOut() {
    setIsLoadingData(true);
    userUpdate({} as IUserProfileDTO);
    await Promise.all([
      storageUserRemove(),
      storageAuthTokenRemove(),
      authenticationTypeUpdate("user")
    ])
    setIsLoadingData(false)
  }

  async function getUserProfile() {
    GetUserProfileService().then(({ data }) => {
      if (data.data) {
        userUpdate(data.data)
      }
    })
  }

  async function getTenantProfile(tenantId: string) {
    GetTenantProfileService(tenantId).then(({ data }) => {
      if (data.data) {
        tenantUpdate(data.data);
      }
    })
  }

  async function loadUserData() {
    try {
      setIsLoadingData(true);
      const { token } = await storageAuthTokenGet();
      if (token) {
        await getUserProfile()
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingData(false);
    }
  }

  async function loadTenantData() {
    try {
      setIsLoadingData(true);
      const tenant = await storageTenantGet();
      if (tenant) {
        await getTenantProfile(tenant.id)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingData(false);
    }
  }

  async function loadTokenData() {
    try {
      setIsLoadingData(true);

      const { token } = await storageAuthTokenGet();

      if (token) {
        tokenUpdate(token);
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingData(false);
    }
  }

  async function authenticateTenant(tenantId: string) {
    setIsLoadingData(true);
    GetTenantProfileService(tenantId)
      .then(async ({ data: { data } }) => {
        if (data.id) {
          tenantUpdate(data)
          authenticationTypeUpdate("tenant")
        }
      }).catch((err) => {
        console.log('err: ', err)
        return err
      }).finally(() => {
        setIsLoadingData(false);
      })
  }

  async function signOutTenant() {
    setIsLoadingData(true);
    authenticationTypeUpdate("user")
    tenantUpdate({} as ITenantDTO);
    await storageTenantRemove()
    setIsLoadingData(false)
  }

  async function verifyAuthenticationType() {
    try {
      const authentication_type = await storageAuthenticationTypeGet();
      loadUserData();

      if (authentication_type && authentication_type == "tenant") {
        loadTenantData()
        authenticationTypeUpdate(authentication_type)
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    loadTokenData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    }
  }, [])


  useEffect(() => {
    verifyAuthenticationType()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      tenant,
      authenticationType,
      isLoadingData,
      singIn,
      signOut,
      authenticateTenant,
      signOutTenant,
      tenantUpdate,
      userUpdate
    }
    }>
      {children}
    </AuthContext.Provider>
  )
}