import { Table } from "@mantine/core";

function HospitalTable({ elements }) {
  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>{element.title}</td>
      <td>{element.body}</td>
      <td>{element.userId}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Element position</th>
          <th>Element name</th>
          <th>Symbol</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
export default HospitalTable;
