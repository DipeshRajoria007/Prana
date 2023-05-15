import { Table } from "@mantine/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function PatientsTable({ elements }) {
  const {
    user: { user: user },
  } = useSelector((state) => state.auth);
  const rows = elements?.map((element, index) => (
    <tr className="max-h-2 text-ellipsis " key={element._id}>
      <td>{index + 1}</td>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.uniqueHealthId}</td>
      <td>{element.contact}</td>
      {/* <td className=" text-ellipsis ">
        {Object.values(element.address).map((value) => value + ", ")}
      </td> */}

      {user.role === "DOCTOR" && (
        <td>
          <Link
            to={element._id}
            className=" rounded-md  bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 "
          >
            Prescribe
          </Link>
        </td>
      )}
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
          {/* <th>Address</th> */}
          {user.role === "DOCTOR" && <th>Action</th>}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
export default PatientsTable;
