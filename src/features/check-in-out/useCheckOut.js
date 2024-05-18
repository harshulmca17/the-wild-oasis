import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (booking) => {
      let bookingObject = booking;
      delete bookingObject.cabins;
      delete bookingObject.guests;
      delete bookingObject.created_at;
      delete bookingObject.endDate;
      delete bookingObject.startDate;

      return updateBooking({
        ...bookingObject,
        status: "checked-out",
        isPaid: true,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Booking #${data.id} successfully checked out`);

      // navigate("/");
      queryClient.invalidateQueries({ activate: true });
    },
    onError: (data) => {
      toast.success(`Error with Booking #${data.id} checkin out`);
    },
  });

  return { checkOut, isCheckingOut };
}
