import { Table } from "@mantine/core";

function DoctorsTable({ elements }) {
  const rows = elements?.map((element) => (
    <tr key={element.id}>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.contact}</td>
      <td>
        {element.specializations?.map((speciality) => (
          <p key={speciality}>{speciality}</p>
        ))}
      </td>
      <td>{element.address}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Name </th>
          <th>Email Id</th>
          <th>Contact</th>
          <th>Specialization</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
export default DoctorsTable;
