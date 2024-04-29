import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreateLoading, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success(`New Cabin Created Successfully..`);
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreateLoading, createCabin };
}
