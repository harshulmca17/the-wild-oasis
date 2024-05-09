import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ selectValue, options }) {
  const [searchparams, setSearchParams] = useSearchParams();

  const sortBy = searchparams.get(selectValue) || "";
  function handleChange(e) {
    searchparams.set(selectValue, e.target.value);
    setSearchParams(searchparams);
  }
  return (
    <Select
      options={options}
      type={"white"}
      value={sortBy}
      onChange={handleChange}
    />
  );
}
