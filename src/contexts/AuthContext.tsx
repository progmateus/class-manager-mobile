import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { IUserDTO } from "@dtos/IUserDTO";
import { api } from "src/services/api";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { SignInService } from "src/services/authService";
import { CompositeNavigationProp, NavigationContext, useNavigation } from "@react-navigation/native";
import { GuestNavigatorRoutesProps } from "@routes/guest.routes";
import { UserNavigatorRoutesProps } from "@routes/user.routes";


export type AuthContextDataProps = {
  user: IUserDTO;
  singIn: (email: string, password: string) => Promise<void>;
  updateUserProfile: (userUpdated: IUserDTO) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<IUserDTO>({} as IUserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);
  const navigation = useContext(NavigationContext);


  async function userAndTokenUpdate(userData: IUserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: IUserDTO, token: string, refresh_token: string) {
    try {
      setIsLoadingUserStorageData(true)
      await storageUserSave(userData);
      await storageAuthTokenSave({ token, refresh_token });

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function singIn(email: string, password: string) {

    SignInService(email, password)
      .then(async ({ data: { data } }) => {
        if (data.id) {
          const { id, name, email, avatar, roles, token, refresh_token } = data
          const user = {
            id,
            name,
            email,
            avatar,
            roles
          }
          await storageUserAndTokenSave(user, token, refresh_token);
          userAndTokenUpdate(user, token);
          navigation?.navigate('search');
        }
      }).catch((err) => {
        throw err
      }).finally(() => {
        setIsLoadingUserStorageData(false);
      })
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as IUserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: IUserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      singIn,
      updateUserProfile,
      signOut,
      isLoadingUserStorageData
    }
    }>
      {children}
    </AuthContext.Provider>
  )
}