import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUserUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success(`User account successfully updated.`);
      queryClient.setQueryData(["user"], user);
      //   queryClient.invalidateQueries({
      //     queryKey: ["user"],
      //   });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUserUpdating, updateUser };
}
