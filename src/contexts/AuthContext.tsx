import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { api } from "src/services/api";
import { storageUserSave } from "@storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";
import { SignInService } from "src/services/authService";
import { GetUserProfileService } from "src/services/usersService";
import { IUserProfileDTO } from "@dtos/users/IUserProfileDTO";


export type AuthContextDataProps = {
  user: IUserProfileDTO;
  singIn: (email: string, password: string) => Promise<void>;
  updateUserProfile: (userUpdated: IUserProfileDTO) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<IUserProfileDTO>({} as IUserProfileDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  function tokenUpdate(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  function userUpdate(userData: IUserProfileDTO) {
    setUser(prevState => { return { ...prevState, ...userData } });
  }

  async function storageUserAndTokenSave(userData: IUserProfileDTO, token: string, refresh_token: string) {
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
          const { user: userResponse, token, refresh_token } = data
          await storageUserAndTokenSave(userResponse, token, refresh_token);
          tokenUpdate(token);
          userUpdate(userResponse);
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
    setUser({} as IUserProfileDTO);
    setIsLoadingUserStorageData(false)
  }

  async function updateUserProfile(userUpdated: IUserProfileDTO) {
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