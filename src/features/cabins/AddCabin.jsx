import React, { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal-v1";

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button> Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* <Modal.Open opens='table'>
        <Button> Show table</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CreateCabinForm />
      </Modal.Window> */}
    </Modal>
  );
  //   const [isOpenModel, setIsOpenModel] = useState(false);
  //   return (
  //     <div>
  //       <Button
  //         onClick={() => {
  //           setIsOpenModel(!isOpenModel);
  //         }}
  //       >
  //         Add New Cabin
  //       </Button>
  //       {isOpenModel && (
  //         <Modal setIsOpenModel={setIsOpenModel}>
  //           <CreateCabinForm setShowForm={setIsOpenModel} />
  //         </Modal>
  //       )}
  //     </div>
  //   );
}
