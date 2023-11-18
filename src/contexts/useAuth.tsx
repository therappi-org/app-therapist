import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';

import { axiosConfig } from '@/api/axiosConfig';
import { SignInFormValues } from '@/app/(auth)/sign-in';
import { AuthQuery } from '@/queries/auth';
import { UserData } from '@/types/user';
import {
  THERAPIST_REGISTERED_KEY,
  THERAPIST_STORE_TOKEN_KEY,
  THERAPIST_STORE_USER_KEY,
  THERAPIST_STORE_WALKTHROUGH_KEY,
} from '@/utils/constants';

export type Auth = {
  signIn(credentials: SignInFormValues): void;
  userData: UserData | undefined;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  signOut(): Promise<void>;
};

const AuthContext = createContext({} as Auth);

const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    isLoading: isAuthLoading,
    mutate,
    data: userData,
  } = AuthQuery.Session({
    async onSuccess(data) {
      if (data) {
        await SecureStore.setItemAsync(
          THERAPIST_STORE_TOKEN_KEY,
          JSON.stringify({
            token: data.token,
            expires: Date.now() + thirtyDaysInMilliseconds,
          })
        );
        await SecureStore.setItemAsync(THERAPIST_STORE_USER_KEY, JSON.stringify(data.user));
        setIsAuthenticated(!!data.user);

        router.replace('/(app)/(walkthrough)/intro');
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const storageToken = await SecureStore.getItemAsync(THERAPIST_STORE_TOKEN_KEY);
        const storageUser = await SecureStore.getItemAsync(THERAPIST_STORE_USER_KEY);

        if (storageToken && storageUser) {
          const parsedStorageToken: { token: string; expires: number } = JSON.parse(storageToken);

          if (Date.now() > parsedStorageToken.expires) {
            return signOut();
          }

          setIsAuthenticated(true);

          axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userData]);

  const signIn = ({ s_email, s_password }: SignInFormValues) => {
    mutate({
      s_email,
      s_password,
    });
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(THERAPIST_STORE_TOKEN_KEY);
    await SecureStore.deleteItemAsync(THERAPIST_STORE_USER_KEY);

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isAuthLoading,
        isAuthenticated,
        userData,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
