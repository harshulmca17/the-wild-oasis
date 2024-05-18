/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi} from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking(id) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: deleteLoading, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: (data) => {
      toast.success(`Booking #${data?.id} Successfully deleted.`);
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      navigate("/bookings")
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteLoading, deleteBooking };
}
