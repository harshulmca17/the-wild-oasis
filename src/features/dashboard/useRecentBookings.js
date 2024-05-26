import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export default function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // const numbDays = !searchParams.get("last");
  const lastDays = searchParams.get("last")
    ? parseInt(searchParams.get("last"))
    : 30; // default 30 days

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["recentBookings", lastDays],
    queryFn: () => getBookingsAfterDate(lastDays),
  });

  return { isLoading, bookings,numDays:lastDays };
}
