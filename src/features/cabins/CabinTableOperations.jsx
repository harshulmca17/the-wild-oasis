import React from "react";
import TableOperations from "./../../ui/TableOperations";
import Filter from "./../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOperations() {
  return (
    <div>
      <TableOperations>
        <Filter
          filterField={"discount"}
          options={[
            { value: "all", text: "All" },
            { value: "no-discount", text: "No Discount" },
            { value: "with-discount", text: "With Discount" },
          ]}
        />
        <SortBy
          selectValue={"sort"}
          options={[
            { value: "name-asc", text: "Sort by name (A-Z)" },
            { value: "name-desc", text: "Sort by name (Z-A)" },
            { value: "regularPrice-asc", text: "Sort by price (low first)" },
            { value: "regularPrice-desc", text: "Sort by price (high first)" },
            { value: "maxCapacity-asc", text: "Sort by capacity (low first)" },
            {
              value: "maxCapacity-desc",
              text: "Sort by capacity (high first)",
            },
          ]}
        />
      </TableOperations>
    </div>
  );
}
