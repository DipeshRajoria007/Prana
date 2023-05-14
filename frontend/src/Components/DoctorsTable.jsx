import { Table } from "@mantine/core";

function DoctorsTable({ elements }) {
  const rows = elements?.map((element, idx) => (
    <tr key={element.id}>
      <td>{idx + 1}</td>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.contact}</td>
      <td>
        {element.specializations?.map((speciality, idx) => (
          <p key={speciality}>
            {speciality}{" "}
            {element.specializations.length !== idx + 1 ? ", " : ""}
          </p>
        ))}
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
          <th>Contact</th>
          <th>Specialization</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
export default DoctorsTable;
