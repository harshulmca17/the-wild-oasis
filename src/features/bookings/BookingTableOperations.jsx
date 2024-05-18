import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", text: "All" },
          { value: "checked-out", text: "Checked out" },
          { value: "checked-in", text: "Checked in" },
          { value: "unconfirmed", text: "Unconfirmed" },
        ]}
      />

      <SortBy
        selectValue="sortBookings"
        options={[
          { value: "start_date-desc", text: "Sort by date (recent first)" },
          { value: "start_date-asc", text: "Sort by date (earlier first)" },
          {
            value: "total_price-desc",
            text: "Sort by amount (high first)",
          },
          { value: "total_price-asc", text: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
