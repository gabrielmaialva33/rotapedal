import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@RotaPedal:token');
    const user = localStorage.getItem('@RotaPedal:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  //* -> SignIn aplication
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@RotaPedal:token', token);
    localStorage.setItem('@RotaPedal:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  //* -> SignOut
  const signOut = useCallback(() => {
    localStorage.removeItem('@RotaPedal:token');
    localStorage.removeItem('@RotaPedal:user');

    setData({} as AuthState);
  }, []);

  //* -> UpdateUser
  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@RotaPedal:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
