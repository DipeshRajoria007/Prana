import { useState, useEffect } from "react";
//Mantine Imports
import { Input, MultiSelect, Select, NumberInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useId } from "@mantine/hooks";
//RTK Query Imports
import {
  useAddDoctorMutation,
  useGetHospitalsQuery,
} from "../features/Api/adminApi";
import { toast } from "react-toastify";
import { specializationArr, GenderArr } from "../constants/index";
//React-icons Imports
import { FaListAlt, FaTransgenderAlt, FaUser } from "react-icons/fa";
import { MdAttachEmail, MdCall } from "react-icons/md";
import { TbLicense } from "react-icons/tb";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { RiHospitalFill } from "react-icons/ri";
import { AiFillIdcard } from "react-icons/ai";

const AddDoctor = () => {
  const id = useId();
  const { data: Hospitals, isLoading, isError, error } = useGetHospitalsQuery();
  const [addDoctor, { isError2, isSuccess2, error2 }] = useAddDoctorMutation();
  const [specializations, setSpecializations] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState();
  const [gender, setGender] = useState();
  const [DOB, setDOB] = useState();
  const [email, setEmail] = useState("");
  const [license, setLicence] = useState("");
  const [hospital, setHospital] = useState("");
  const [aadhaarNumber, setAadhaar] = useState();
  useEffect(() => {
    if (isError2) toast.error(error2);
  }, [isError2]);
  let HospitalData = [];
  Hospitals?.data?.forEach((hospital) => {
    let data = {};
    data.value = hospital._id;
    data.label = hospital.name;
    HospitalData.push(data);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      contact,
      specializations,
      email,
      aadhaarNumber,
      DOB,
      gender,
      license,
      hospital,
      role: "DOCTOR",
    };
    console.log(payload);
    addDoctor(payload);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-bluee p-4 ">
      <form
        onSubmit={handleSubmit}
        className="flex w-80 flex-col gap-3 rounded-lg bg-white p-4 shadow-2xl "
      >
        <p>Fill the form with correct Information</p>
        <Input.Wrapper label="Doctor's Name" id={id} required>
          <Input
            onChange={(e) => setName(e.target.value)}
            icon={<FaUser />}
            variant="filled"
            placeholder="Name"
          />
        </Input.Wrapper>
        <Input.Wrapper label="Contact No." id={id} required>
          <NumberInput
            hideControls
            onChange={(e) => setContact(e)}
            icon={<MdCall />}
            variant="filled"
            placeholder="Contact info"
          />
        </Input.Wrapper>
        <Input.Wrapper label="Email Id :" id={id} required>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            icon={<MdAttachEmail />}
            variant="filled"
            placeholder="email Id"
          />
        </Input.Wrapper>
        <Select
          icon={<FaTransgenderAlt />}
          label="Gender"
          placeholder="Male , Female or Other"
          variant="filled"
          withAsterisk
          onChange={(e) => setGender(e)}
          data={GenderArr}
        />
        <DateInput
          valueFormat="YYYY MMM DD"
          variant="filled"
          value={DOB}
          onChange={(e) => setDOB(e)}
          label="Date of Birth"
          placeholder="eg. 14 sept 2000"
          icon={<BsFillCalendarWeekFill />}
        />
        <MultiSelect
          value={specializations}
          onChange={setSpecializations}
          data={specializationArr}
          variant="filled"
          label="Specializations"
          withAsterisk
          placeholder="select specialization"
          icon={<FaListAlt />}
        />
        <Select
          icon={<RiHospitalFill />}
          label="Select Hospital"
          placeholder="Pick one"
          searchable
          nothingFound="No options"
          variant="filled"
          maxDropdownHeight={280}
          withAsterisk
          onChange={(e) => setHospital(e)}
          data={HospitalData}
        />
        <Input.Wrapper label="Lisence Number" id={id} required>
          <Input
            icon={<TbLicense />}
            variant="filled"
            onChange={(e) => setLicence(e.target.value)}
            placeholder="Enter your Lisence Number"
          />
        </Input.Wrapper>
        <Input.Wrapper label="Aadhaar Number" id={id} required>
          <Input
            icon={<AiFillIdcard />}
            variant="filled"
            onChange={(e) => setAadhaar(e)}
            placeholder="Enter your address"
          />
        </Input.Wrapper>
        <button className="rounded-sm bg-purplee p-2 text-white">
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
