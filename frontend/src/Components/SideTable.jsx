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
  if (elements?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 14H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v2"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5h5M16 17h2a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h2"
          />
        </svg>
        <p className="mb-4 text-lg font-medium text-gray-500">Empty Record</p>
        <p className="text-sm text-gray-400">
          There is no data to display at the moment
        </p>
      </div>
    );
  }

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
