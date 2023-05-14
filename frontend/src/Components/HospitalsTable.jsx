import { Table } from "@mantine/core";

function HospitalsTable({ elements }) {
  console.log(elements);
  const rows = elements?.map((element, idx) => (
    <tr key={element.id}>
      <td>{idx + 1}</td>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.contact}</td>
      <td>
        {element.specializations?.map((speciality) => (
          <p key={speciality}>{speciality}</p>
        ))}
      </td>
      <td>{Object.values(element.address).map((value) => value + ", ")}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Sr No.</th>
          <th>Hospital Name </th>
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
export default HospitalsTable;
