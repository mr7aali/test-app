export const setTokenToStorage = (key: string, value: string) => {
  if (typeof window !== "undefined" && key) {
    localStorage.setItem(key, value);
  }
};

export const getFromStorage = (key: string) => {
  if (typeof window !== "undefined" && key) {
    return localStorage.getItem(key);
  } else {
    return null;
  }
};
