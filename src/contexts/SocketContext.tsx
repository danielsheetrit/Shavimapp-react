import React, {
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { Socket, io } from "socket.io-client";

import useAuth from "../hooks/useAuth";

const clientURL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const SocketContext = React.createContext<Socket | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const isExecutedRef = useRef(false);
  const { isAuthenticated, user } = useAuth();

  const initSocket = useCallback(() => {
    const newSocket = io(clientURL, {
      auth: {
        userId: user?._id,
      },
    });

    setSocket(newSocket);
    isExecutedRef.current = true;
  }, [user?._id]);

  useEffect(() => {
    if (!isAuthenticated) {
      socket?.disconnect();
    }

    window.addEventListener("beforeunload", () => {
      socket?.disconnect();
    });
  }, [isAuthenticated, socket]);

  useEffect(() => {
    if (isAuthenticated && user && !isExecutedRef.current) {
      initSocket();
    }
  }, [isAuthenticated, user, initSocket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
