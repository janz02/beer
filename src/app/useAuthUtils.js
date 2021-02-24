import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useAuthUtils = () => {
  const { username } = useSelector((state) => state.auth);
  const isLoggedIn = useMemo(() => username !== "", [username]);

  return isLoggedIn;
};
