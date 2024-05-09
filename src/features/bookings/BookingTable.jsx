import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByValue = searchParams.get("sortBookings") || "startDate-desc";
  const [field, direction] = sortByValue.split("-");

  const sortBy = { field, direction };
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const {
    isLoading,
    data: dataBookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy,page],
    queryFn: () => getBookings({ filter, sortBy,page }),
  });


  
  if (isLoading) return <Spinner />;

  if (!dataBookings?.bookings) return <Empty resourceName="bookings" />;
  
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={dataBookings?.bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={dataBookings?.count} result={dataBookings?.bookings?.length} pages={dataBookings?.pages}/>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
