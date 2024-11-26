import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

import { api } from "src/services/api";
import { storageUserRemove, storageUserSave } from "@storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { SignInService } from "src/services/authService";
import { GetUserProfileService } from "src/services/usersService";
import { IUserProfileDTO } from "@dtos/users/IUserProfileDTO";
import { GetTenantProfileService } from "src/services/tenantsService";
import { storageAuthenticationTypeGet, storageAuthenticationTypeSave } from "@storage/storageAuthenticationType";
import { storageTenantGet, storageTenantRemove, storageTenantSave } from "@storage/storageTenant";
import { AxiosError } from "axios";
import { AppError } from "@utils/errors/AppError";
import { ValidationError } from "@utils/errors/ValidationError";
import { ITenantProfileDTO } from "@dtos/tenants/ITenantProfileDTO";


export type AuthContextDataProps = {
  user: IUserProfileDTO;
  tenant: ITenantProfileDTO;
  authenticationType: "user" | "tenant";
  isLoadingData: boolean;
  singIn: (email: string, password: string) => Promise<void>;
  userUpdate: (userUpdated: IUserProfileDTO) => Promise<void>;
  tenantUpdate: (tenantData: ITenantProfileDTO) => Promise<void>;
  signOut: () => Promise<void>;
  authenticateTenant: (tenantId: string) => Promise<void>;
  signOutTenant: () => Promise<void>
  refreshUser: () => Promise<void>
  refreshTenant: () => Promise<void>;
  hasTenants: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<IUserProfileDTO>({} as IUserProfileDTO);
  const [tenant, setTenant] = useState<ITenantProfileDTO>({} as ITenantProfileDTO);
  const [authenticationType, setAuthenticationType] = useState<"user" | "tenant">("user");
  const [isLoadingData, setIsLoadingData] = useState(true);

  function tokenUpdate(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }


  const hasTenants = useMemo(() => {
    return user.usersRoles && user.usersRoles.filter((ur) => ur.role.name === "admin").length > 0
  }, [user.usersRoles])

  async function userUpdate(userData: Partial<IUserProfileDTO>) {
    setUser(prevState => { return { ...prevState, ...userData } });
    await storageUserSave(user);
  }

  async function tenantUpdate(tenantData: Partial<ITenantProfileDTO>) {
    setTenant(prevState => { return { ...prevState, ...tenantData } });
    await storageTenantSave(tenant);
  }

  async function authenticationTypeUpdate(type: "tenant" | "user") {
    setAuthenticationType(type)
    await storageAuthenticationTypeSave(type);
  }

  async function singIn(email: string, password: string): Promise<void> {
    setIsLoadingData(true);

    try {
      const { data } = await SignInService(email, password)
      if (data.data.id) {
        const { user: userResponse, token, refresh_token } = data.data
        await storageAuthTokenSave({ token, refresh_token });
        tokenUpdate(token);
        userUpdate(userResponse);
      }
    } catch (err) {
      if (err instanceof AxiosError || err instanceof AppError || err instanceof ValidationError) {
        throw new Error(err.message)
      }
      throw new Error('Internal server error')
    } finally {
      setIsLoadingData(false);
    }
  }

  async function signOut() {
    setIsLoadingData(true);
    setUser({} as IUserProfileDTO);
    await Promise.all([
      storageUserRemove(),
      storageAuthTokenRemove(),
      authenticationTypeUpdate("user")
    ])
    setIsLoadingData(false)
  }

  async function refreshUser() {
    GetUserProfileService().then(({ data }) => {
      if (data.data) {
        userUpdate(data.data)
      }
    })
  }

  async function refreshTenant() {
    GetTenantProfileService(tenant.id).then(({ data }) => {
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
        await refreshUser()
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
      if (tenant && tenant.id) {
        await refreshTenant()
      } else {
        signOutTenant()
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
    setTenant({} as ITenantProfileDTO);
    await storageTenantRemove()
    setIsLoadingData(false)
  }

  async function verifyAuthenticationType() {
    try {
      const authentication_type = await storageAuthenticationTypeGet();
      loadUserData();
      if (authentication_type && authentication_type == "tenant") {
        if (tenant.id) {
          authenticationTypeUpdate(authentication_type)
          loadTenantData()
        } else {
          authenticationTypeUpdate("user")
        }
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
      userUpdate,
      refreshUser,
      refreshTenant,
      hasTenants
    }
    }>
      {children}
    </AuthContext.Provider>
  )
}