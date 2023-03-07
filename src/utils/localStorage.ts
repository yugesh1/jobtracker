import { IUser } from "../constants/interface";

export const addUserToLocalStorage = (user: IUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = (): IUser | null => {
  const result = localStorage.getItem("user");
  return result ? JSON.parse(result) : null;
};
