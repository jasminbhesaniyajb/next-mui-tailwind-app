import { useCallback } from "react";
import { encryptPassword, getRegisterUser, setRegisterUser } from "@/utils";

export const useStorageUsers = () => {
  const getUsers = useCallback(() => getRegisterUser() || [], []);

  const saveUser = useCallback((user) => {
    const users = getUsers();

    const newUser = {
      ...user,
      password: encryptPassword(user.password),
    };

    users.push(newUser);
    setRegisterUser(users);
  }, [getUsers]);

  const isEmailExist = useCallback(
    (email) => {
      const users = getUsers();
      return users?.some((user) => user.email === email);
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
