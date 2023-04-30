import { Table } from "@mantine/core";

function SideTable({ elements }) {
  const rows = elements?.map((element, idx) => {
    const date = new Date(element.createdAt);
    return (
      <tr key={element.id}>
        <td>{idx + 1}</td>
        <td>{element.name}</td>
        <td>{date.toDateString()}</td>
      </tr>
    );
  });

  return (
    <Table>
      <thead>
        <tr>
          <th>Sr.No </th>
          <th>Name</th>
          <th>Entry Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
export default SideTable;
