import { LOGIN_USER_COOKIE_KEY, REGISTER_USERS_KEY, SECRET_KEY } from "@/constant";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

export const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

export const decryptPassword = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const setLoggedInUser = (user) => {
  if (!user) return;
  Cookies.set(LOGIN_USER_COOKIE_KEY, JSON.stringify(user), {
    expires: 7,
  });
};

export const setRegisterUser = (user) => {
  if (!user) return;
  Cookies.set(REGISTER_USERS_KEY, JSON.stringify(user), {
    expires: 7,
  });
};

export const getRegisterUser = () => {
  const cookieValue = Cookies.get(REGISTER_USERS_KEY);
  try {
    return cookieValue ? JSON.parse(cookieValue) : null;
  } catch (err) {
    console.error("Failed to parse loggedInUser from cookie", err);
    return null;
  }
};

export const getLoggedInUser = () => {
  const cookieValue = Cookies.get(LOGIN_USER_COOKIE_KEY);
  try {
    return cookieValue ? JSON.parse(cookieValue) : null;
  } catch (err) {
    console.error("Failed to parse loggedInUser from cookie", err);
    return null;
  }
};

export const clearLoggedInUser = () => {
  Cookies.remove(LOGIN_USER_COOKIE_KEY);
};