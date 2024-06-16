import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (booking) => {
        let bookingObject = booking;
        delete bookingObject.cabins;
        delete bookingObject.guests;
        delete bookingObject.created_at;
        delete bookingObject.endDate;
        delete bookingObject.startDate;
        
        return updateBooking({
          ...bookingObject,
          id: parseInt(bookingObject.id),
          status: "checked-in",
          isPaid: true,
        })},
    onSuccess: (data) => {
        console.log(data)
      toast.success(`Booking #${data.id} successfully checked in`);
     
      navigate("/");
      queryClient.invalidateQueries({ activate: true });
    },
    onError: (data) => {
      toast.success(`Error with Booking #${data.id} checkin in`);
    },
  });

  return { checkin, isCheckingIn };
}
