import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: (settingsObject)=>{
      updateSettingApi(settingsObject)
    },
    onSuccess: () => {
      toast.success(`Setting Updated Successfully..`);
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateSetting };
}
