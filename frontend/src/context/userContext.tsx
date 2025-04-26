import React, { createContext, useState, ReactNode } from 'react';

// 1. Define a User type (customize as needed)
export interface User {
  id: string;
  name: string;
  email: string;
  profileImageUrl: string;
  // Add more fields if required
}

// 2. Define context value type
interface UserContextType {
  user: User | null;
  updateUser: (userData: User) => void;
  clearUser: () => void;
}

// 3. Create the context with default value (null for now)
export const UserContext = createContext<UserContextType | null>(null);

// 4. Props type for the provider
interface UserProviderProps {
  children: ReactNode;
}

// 5. Provider component
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
