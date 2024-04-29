/* eslint-disable no-const-assign */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useState } from "react";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { useCreateCabin } from "./useCreateCabin";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const SUPABASE_BASE_URL = import.meta.env.VITE_SUPABASE_BASE_URL;

export default function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  const { deleteLoading, deleteCabin } = useDeleteCabin(cabin);
  const { isCreateLoading, createCabin } = useCreateCabin();

  function handleCopyCabin() {
    let cabinTemp = { ...cabin };
    delete cabinTemp.id;
    cabinTemp.name = `Copy of ${cabinTemp.name}`;
    createCabin(cabinTemp);
  }
  return (
    <>
      <TableRow role="row">
        <Img src={SUPABASE_BASE_URL + image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button
            onClick={() => {
              handleCopyCabin();
            }}
          >
            <HiSquare2Stack />
          </button>{" "}
          <button
            onClick={() => {
              setShowForm((showForm) => !showForm);
            }}
          >
            <HiPencilAlt />
          </button>{" "}
          <button
            disabled={deleteLoading}
            onClick={(e) => {
              deleteCabin(id);
            }}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}
