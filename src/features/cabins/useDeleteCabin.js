/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin(cabin) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const queryClient = useQueryClient();
  const { isLoading: deleteLoading, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success(`Cabin ${name} Successfully deleted.`);
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteLoading, deleteCabin };
}
