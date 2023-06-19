import jwtDecode from "jwt-decode";
import axios from "./axios";

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  // ----------------------------------------------------------------------
  const decoded: { exp: number } = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = async (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - (currentTime - 5000);

  expiredTimer = window.setTimeout(async () => {
    // You can do what ever you want here, like show a notification
    alert("Please login again");
    await axios.put("/users/logout");
  }, timeLeft);
};

// ----------------------------------------------------------------------

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp }: { exp: number } = jwtDecode(accessToken);
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
