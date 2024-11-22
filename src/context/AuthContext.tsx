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

// Define interfaces for our data structures
interface Library {
  _id: string;
  // Add other library properties as needed
}

interface User {
  _id: string;
  library?: Library;
  // Add other user properties as needed
}

// Define the context value interface
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

          if (userData.library && userData.library._id) {
            setLibraryId(userData.library._id);
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
