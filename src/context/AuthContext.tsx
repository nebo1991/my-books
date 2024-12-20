import axios from "axios";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

const API_URL = import.meta.env.VITE_BOOKS_API;

interface Library {
  id: number;
}

interface User {
  id: number;
  library?: Library;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  libraryId: string | null;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  setLibraryId: Dispatch<SetStateAction<string | null>>;
}

// Create context with type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props interface for the provider
interface AuthContextProviderProps {
  children: ReactNode;
}

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("authToken") ? true : false
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [libraryId, setLibraryId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoading(true);
      axios
        .get<User>(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);

          if (userData.library && userData.library.id) {
            setLibraryId(`${userData.library.id}`);
          } else {
            setLibraryId(null);
          }

          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setIsLoading(false);
        });
    }
  }, []);

  const contextValue: AuthContextType = {
    isLoggedIn,
    isLoading,
    user,
    libraryId,
    setIsLoggedIn,
    setIsLoading,
    setUser,
    setLibraryId,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export { AuthContextProvider, useAuthContext };
