import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect } from 'react';

import { axiosConfig } from '@/api/axiosConfig';
import { SignInFormValues } from '@/app/(auth)/sign-in';
import { AuthQuery } from '@/queries/auth';
import { UserData } from '@/types/user';

export type Auth = {
  signIn(credentials: SignInFormValues): void;
  userData: UserData | undefined;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  signOut(): Promise<void>;
};

const AuthContext = createContext({} as Auth);

const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
const therappiStoreTokenKey = 'therappi.therapist.token';
const therappiStoreUserKey = 'therappi.therapist.user';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isLoading: isAuthLoading,
    mutate,
    data: userData,
  } = AuthQuery.Session({
    async onSuccess(data) {
      if (data) {
        await SecureStore.setItemAsync(
          therappiStoreTokenKey,
          JSON.stringify({
            token: data.token,
            expires: Date.now() + thirtyDaysInMilliseconds,
          })
        );
        await SecureStore.setItemAsync(therappiStoreUserKey, JSON.stringify(data.user));

        router.replace('/(app)/(tabs)/home');
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const storageToken = await SecureStore.getItemAsync(therappiStoreTokenKey);
        const storageUser = await SecureStore.getItemAsync(therappiStoreUserKey);

        if (storageToken && storageUser) {
          const parsedStorageToken: { token: string; expires: number } = JSON.parse(storageToken);

          if (Date.now() > parsedStorageToken.expires) {
            return signOut();
          }

          axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userData]);

  let isAuthenticated = !!userData;

  const signIn = async ({ s_email, s_password }: SignInFormValues) => {
    mutate({
      s_email,
      s_password,
    });
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(therappiStoreTokenKey);
    await SecureStore.deleteItemAsync(therappiStoreUserKey);

    isAuthenticated = false;
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
