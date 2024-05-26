import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export default function useRecentStays() {
  const [searchParams] = useSearchParams();

  // const numbDays = !searchParams.get("last");
  const lastDays = searchParams.get("last")
    ? parseInt(searchParams.get("last"))
    : 30; // default 30 days

  const { isLoading, data: stays } = useQuery({
    queryKey: ["recentStays", lastDays],
    queryFn: () => getStaysAfterDate(lastDays),
  });

  const confirmedStays =
    stays?.filter(
      (stay) => stay.status === "checked-in" || stay.status === "checked-out"
    ) || [];
  return { isLoading, stays, confirmedStays, numDays:lastDays };
}
