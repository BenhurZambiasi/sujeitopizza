import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { destroyCookie, setCookie } from "nookies";
import router from "next/router";
import { sessionLogin } from "../services/auth";

type TAuthContext = {
  user: TUserProps;
  isAuthenticated: boolean;
  signin: (credentials: TSigninProps) => Promise<TRequestProps>;
  signOut: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

type TUserProps = {
  id: string;
  name: string;
  email: string;
};

type TSigninProps = {
  password: string;
  email: string;
};

type TAuthProviderProps = {
  children: ReactNode;
};

type TRequestProps = {
  success: boolean;
  failure: boolean;
  message: string;
};

const initialUser = {
  id: "",
  name: "",
  email: "",
};

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    router.push("/");
  } catch (error) {
    console.log("Erro ao deslogar");
  }
}

const AuthContext = createContext({} as TAuthContext);

export function AuthProvider({ children }: TAuthProviderProps) {
  const [user, setUser] = useState<TUserProps>(initialUser);
  const [loading, setLoading] = useState<boolean>(false);
  const isAuthenticated = !!user.id;

  const signin = async ({ email, password }: TSigninProps) => {
    setLoading(true);

    const response = await sessionLogin({ email, password });

    if (response) {
      if (response.status === 200) {
        const { data } = response;
        setUser(data);
        setCookie(undefined, "@nextauth.token", data.token, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        setLoading(false);

        return { success: true, failure: false, message: "" };
      } else {
        setLoading(false);
        const { message }: any = response;
        return { success: false, failure: true, message: message };
      }
    } else {
      setLoading(false);
      return { success: false, failure: true, message: "" };
    }
    setLoading(false);

    return { success: false, failure: true, message: "" };
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signin, signOut, setLoading, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): TAuthContext {
  const context = useContext(AuthContext);
  return context;
}
