import React, { createContext, useState } from 'react';

interface IUser {
  id: string;
  email: string;
}
interface IUserContext {
  user: IUser | null;
  setUser: (data: IUser | null) => void;
}

const defaultContextValue = { setUser: (state: IUser | null) => state, user: null };
export const UserContext = createContext<IUserContext>(defaultContextValue);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
