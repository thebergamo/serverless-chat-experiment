import { User } from "../types";

const APP_PREFIX = import.meta.env.VITE_APP_PREFIX || "chat";

export function prefixKey(key: string) {
  return `${APP_PREFIX}_${key}`;
}

export function saveKey(key: string, value: any) {
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(prefixKey(key), value);
}

export function getKey(key: string) {
  const rawValue = localStorage.getItem(prefixKey(key));
  if (!rawValue) {
    return rawValue;
  }
  try {
    return JSON.parse(rawValue);
  } catch (err) {
    return rawValue;
  }
}

const USER_KEY = "chat_user";
export function saveUser(user: User) {
  return saveKey(USER_KEY, user);
}

export function getUser(): User | null {
  return getKey(USER_KEY);
}
