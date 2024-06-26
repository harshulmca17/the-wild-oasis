import CabinTable from "../features/cabins/CabinTable-v2";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
 

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Row>
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
