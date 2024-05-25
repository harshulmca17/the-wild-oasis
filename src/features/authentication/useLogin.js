import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin(email, password) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isLoginProcess, mutate: loginApi } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      toast.success(`${data?.user?.email ?? ""} Logged In Successfully..`);

      queryClient.setQueryData({
        queryKey: ["user", data.user],
      });
      navigate("/dashboard");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isLoginProcess, loginApi };
}
