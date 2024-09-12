import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { api } from "src/services/api";
import { storageUserSave } from "@storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";
import { SignInService } from "src/services/authService";
import { GetUserProfileService } from "src/services/usersService";
import { IUserDTO } from "@dtos/users/IUserDTO";


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

  function tokenUpdate(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  function userUpdate(userData: IUserDTO) {
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
          const { id, name, email, document, avatar, roles, token, refresh_token, username } = data
          const user = {
            id,
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1],
            username,
            document,
            email,
            avatar,
            roles
          }
          await storageUserAndTokenSave(user, token, refresh_token);
          tokenUpdate(token);
          userUpdate(user);
        }
      }).catch((err) => {
        console.log('err: ', err)
        return err
      }).finally(() => {
        setIsLoadingUserStorageData(false);
      })
  }

  async function getUserProfile() {
    setIsLoadingUserStorageData(true);
    GetUserProfileService().then(({ data }) => {
      if (data.data) {
        userUpdate(data.data)
      }
    }).catch((err) => {
      console.log('err: ', err)
    }).finally(() => {
      setIsLoadingUserStorageData(false);
    })
  }


  async function signOut() {
    setIsLoadingUserStorageData(true);
    await signOut()
    setUser({} as IUserDTO);
    setIsLoadingUserStorageData(false)
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
      const { token } = await storageAuthTokenGet();
      console.log('loadUserData: ', token)
      if (token) {
        await getUserProfile()
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadTokenData() {
    console.log('loadTokenData: ')
    try {
      setIsLoadingUserStorageData(true);

      const { token } = await storageAuthTokenGet();

      if (token) {
        tokenUpdate(token);
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadTokenData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      console.log('subscribe: ')
      subscribe();
    }
  }, [])


  useEffect(() => {
    loadUserData()
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