import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import FollowUpCard from "./FollowUpCard";
import FollowupForm from "./FollowupForm";

const MedicalHistory = ({ patient }) => {
  const [displayCount, setDisplayCount] = useState(10);
  const [recordData, setRecordData] = useState({});
  const [opened, { open, close }] = useDisclosure(false);
  const handleClickFollowUp = (record) => {
    setRecordData(record);
    open();
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4 drop-shadow-2xl ">
      <h1 className=" text-2xl font-bold uppercase text-gray-800">
        Medical History
      </h1>
      {patient?.history?.slice(0, displayCount).map((record) => (
        <div key={record?.historyId} className="ml-2">
          <p className="mb-1">
            <span className="font-bold">Hospital Visited:</span>{" "}
            {record?.hospitalVisited?.name}
          </p>
          <p className="mb-1">
            <span className="font-bold">Disease Diagnosed:</span>{" "}
            {record?.diagnosis}
          </p>
          <p className="mb-1">
            <span className="font-bold">Date of Diagnosis:</span>{" "}
            {new Date(record?.createdAt).toLocaleDateString()}
          </p>
          <p className="mb-1">
            <span className="font-bold">medicinePrescription Received:</span>{" "}
            {record?.medicinePrescription}
          </p>
          <p className="mb-1">
            <span className="font-bold">Reason for Visit:</span>{" "}
            {record?.symptoms}
          </p>
          <p className="mb-1">
            <span className="font-bold">Doctor Name:</span>{" "}
            {record?.doctor?.name}
          </p>
          <button
            onClick={() => handleClickFollowUp(record)}
            className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-700 "
          >
            Add Follow Up
          </button>
          <hr className="my-2" />
          {record?.followups.length > 0 && (
            <div className="ml-2">
              <h1 className="text-xl font-semibold">Follow ups</h1>
              {record?.followups.map((followup) => (
                <FollowUpCard followup={followup} />
              ))}
            </div>
          )}
        </div>
      ))}
      {patient?.history?.length > displayCount && (
        <button
          onClick={() => setDisplayCount(displayCount + 10)}
          className="rounded-lg  bg-blue-500 p-2 text-white hover:bg-blue-700"
        >
          Show more
        </button>
      )}
      {displayCount > 10 && (
        <button
          onClick={() => setDisplayCount(0)}
          className="rounded-lg  bg-blue-500 p-2 text-white hover:bg-blue-700"
        >
          Hide Records
        </button>
      )}
      <Modal opened={opened} onClose={close} size="lg" withCloseButton={false}>
        <FollowupForm history={recordData} patient={patient} />
      </Modal>
    </div>
  );
};

export default MedicalHistory;
