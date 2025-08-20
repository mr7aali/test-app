// import { getFromStorage } from "@/utils/setToLocalStorage";
// import { setToLOcalStorage } from "@/utils/setToLocalStorage";

import { getFromStorage, setTokenToStorage } from "@/utils/setToLocalStorage";
import { jwtDecode } from "jwt-decode";

// import {} from
export const storeUserInfo = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  setTokenToStorage("accessToken", accessToken);
  setTokenToStorage("refreshToken", refreshToken);
};

export const getUserInfo = () => {
  const accessToken = getFromStorage("accessToken");
  if (accessToken) {
    const decodedData = jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const isLoggedIn = () => {
  const accessToken = getFromStorage("accessToken");
  const refreshToken = getFromStorage("refreshToken");
  return !!accessToken || !!refreshToken;
};

export const removeUserInfo = () => {
  return localStorage.removeItem("accessToken");
};

export const getToken = () => {
  const accessToken = getFromStorage("accessToken") ?? "";
  const refreshToken = getFromStorage("refreshToken") ?? "";

  return { accessToken: accessToken, refreshToken: refreshToken };
};

export const logOutUser = () => {
  try {
    if (typeof window !== "undefined") {
      ["accessToken", "refreshToken"].forEach((key) =>
        localStorage.removeItem(key)
      );
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
