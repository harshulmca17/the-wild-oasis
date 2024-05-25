import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser(email, password) {
  const { isLoading: isGetUserLoading, data: user } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });
  return {
    isGetUserLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
