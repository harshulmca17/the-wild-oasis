import React from "react";
import Stat from "./Stat";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
export default function stats({
  bookings,
  confirmedStays,
  numDays,
  cabinsCount,
}) {
  const numBookings = bookings.length ?? 0;
  const totalCheckins = confirmedStays.length ?? 0;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //   const occupancyRate = (totalCheckins / numBookings) * 100;

  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinsCount);
    console.log(cabinsCount,numDays, confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0))
  return (
    <>
      <Stat
        title="Bookings"
        color={"blue"}
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color={"green"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check Ins"
        color={"indigo"}
        icon={<HiOutlineCalendarDays />}
        value={totalCheckins}
      />
      <Stat
        title="Occupancy Rate"
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate*100)+"%"}
      />
    </>
  );
}
