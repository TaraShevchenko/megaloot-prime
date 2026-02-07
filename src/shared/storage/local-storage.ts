const isClient = () => typeof window !== "undefined";

export const getLocalStorageItem = (key: string): string | null => {
  if (!isClient()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setLocalStorageItem = (key: string, value: string): void => {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore quota or access errors in MVP.
  }
};

export const removeLocalStorageItem = (key: string): void => {
  if (!isClient()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore removal errors in MVP.
  }
};
