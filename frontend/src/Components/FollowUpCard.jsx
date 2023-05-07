const FollowUpCard = ({ followup }) => {
  return (
    <div key={followup.followUpId} className="ml-2">
      <p className="font-semibold"> Follow Up {followup.followUpId + 1} </p>
      <p>
        <span className="font-bold"> Patient's Update : </span>
        {followup.patientsUpdate}
      </p>
      <p>
        <span className="font-bold"> Diagnosis: </span>
        {followup.diagnosis}
      </p>
      <p>
        <span className="font-bold"> Medicine Prescription : </span>
        {followup.medicinePrescription}
      </p>
      {followup.tests && (
        <p>
          <span className="font-bold"> Tests : </span>
          {followup.tests}
        </p>
      )}{" "}
      <p>
        <span className="font-bold"> Date : </span>
        {new Date(followup?.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default FollowUpCard;
