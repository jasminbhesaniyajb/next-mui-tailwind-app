import { useCallback } from "react";
import { STORAGE_KEY } from "@/constant";
import { encryptPassword } from "@/utils";

export const useLocalStorageUsers = () => {
  const getUsers = useCallback(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }, []);

  const saveUser = useCallback((user) => {
    const users = getUsers();

    const newUser = {
      ...user,
      password: encryptPassword(user.password),
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [getUsers]);

  const isEmailExist = useCallback(
    (email) => {
      const users = getUsers();
      return users.some((user) => user.email === email);
    },
    [getUsers]
  );

  const getUserByEmail = (email) => {
    const users = getUsers();
    return users.find((user) => user.email === email);
  };

  return {
    getUsers,
    saveUser,
    isEmailExist,
    getUserByEmail
  };
};
