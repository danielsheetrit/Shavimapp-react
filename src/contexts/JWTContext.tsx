import { createContext, ReactNode, useEffect, useReducer } from "react";
import { IUser } from "../interfaces/IUser";

// utils
import { isValidToken, setSession } from "../utils/jwt";

import axios from "../utils/axios";

// ----------------------------------------------------------------------

interface State {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: IUser | null; // Replace 'any' with the actual type of your user
}

interface Action {
  type: string;
  payload?: any; // Replace 'any' with the actual type of your payload
}

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers: { [key: string]: (state: State, action: Action) => State } = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

interface ContextProps {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: IUser | null; // Replace 'any' with the actual type of your user
  method: string;
  login: (username: string, password: string) => Promise<void>;
  loginEmployee: (id: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<ContextProps>({
  ...initialState,
  method: "jwt",
  loginEmployee: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get(`/users/user-with-token`);
          const user: IUser = response.data.user[0];

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await axios.post("/users/login", {
      username,
      password,
    });
    const { accessToken, user } = response.data;

    delete user.password;

    setSession(accessToken);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const loginEmployee = async (username: string) => {
    const response = await axios.post("/users/login-employee", {
      username,
    });
    const { user, accessToken } = response.data;

    delete user.password;

    setSession(accessToken);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    await axios.put("/users/logout");
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        loginEmployee,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
