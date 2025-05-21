import CryptoJS from "crypto-js";

const SECRET_KEY = "secret-key"

export const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

export const decryptPassword = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const setLoggedInUser = (user) => {
  if (!user) return;
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};

export const getLoggedInUser = () => {
  const data = localStorage.getItem("loggedInUser");
  try {
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Failed to parse loggedInUser from localStorage", err);
    return null;
  }
};

export const clearLoggedInUser = () => {
  localStorage.removeItem("loggedInUser");
};