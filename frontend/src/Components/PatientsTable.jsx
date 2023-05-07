import { Table } from "@mantine/core";
import { Link } from "react-router-dom";
function PatientsTable({ elements }) {
  const rows = elements?.map((element, index) => (
    <tr key={element._id}>
      <td>{index + 1}</td>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.uniqueHealthId}</td>
      <td>{element.contact}</td>
      <td>{element.address}</td>
      <td>
        <Link
          to={element._id}
          className=" rounded-md  bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 "
        >
          Prescribe
        </Link>
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Sr No.</th>
          <th>Name </th>
          <th>Email Id</th>
          <th>Unique Health Id</th>
          <th>Contact</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
export default PatientsTable;
