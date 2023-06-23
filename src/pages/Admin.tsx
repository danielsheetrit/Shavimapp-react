import { useEffect } from "react";

import useSocket from "../hooks/useSocket";
import { events } from "../config/socketIo";

export default function Admin() {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on(events.USER_ACTIVITY_UPDATE, (data) => {
      console.log("USER_ACTIVITY_UPDATE", data);
    });

    socket.on(events.USER_IN_BREAK, () => {
      console.log("in break");
    });

    socket.on(events.USER_CAME_FROM_BREAK, () => {
      console.log("Came back from break");
    });

    socket.on(events.CALL_FOR_HELP, () => {
      console.log("Call for help");
    });
  }, [socket]);

  return <div>New admin page</div>;
}
