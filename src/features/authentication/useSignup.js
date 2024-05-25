import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import React from "react";
import toast from "react-hot-toast";

export default function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password })=>signupApi({ fullName, email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account created successfully! Please verify the new account from the user's email address."
      );
    },
  });

  return { signup, isLoading };
}
