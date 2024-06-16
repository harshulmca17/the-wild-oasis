import styled from "styled-components";
import Stats from "../dashboard/stats";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
// import Heading from "../ui/Heading";
import Spinner from "../../ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { confirmedStaysbookings, isLoading: isLoadingBookings } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  const finalCabins = cabins?.result || [];
  if (isLoadingBookings || isLoadingStays || isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={confirmedStays}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinsCount={finalCabins.length}
      />
      <Today />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={confirmedStays} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
