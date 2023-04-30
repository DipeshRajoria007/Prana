import { Input, Textarea, MultiSelect } from "@mantine/core";
import { FiPhone } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { CiHospital1 } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";

import {
  MdOutlineAlternateEmail,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { useId } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { useAddHospitalMutation } from "../features/Api/adminApi";
import { toast } from "react-toastify";
const AddHospital = () => {
  const id = useId();
  const [specializations, setSpecializations] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  const [addHospital, { isError, isLoading, isSuccess, error, data: res }] =
    useAddHospitalMutation();
  useEffect(() => {
    if (error) toast.error(error.message);
    if (res) toast.success(res.message);
  }, [isError, isLoading, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      contact,
      email,
      address,
      specializations,
      adminEmail,
      role: "HOSPITAL",
    };
    addHospital(payload);
  };

  const data = [
    { value: "All", label: "All" },
    { value: "General ", label: "General " },
    { value: "Psychiatrist", label: "Psychiatrist" },
    { value: "Neurologist", label: "Neurologist" },
    { value: "Pediatrician", label: "Pediatrician" },
    { value: "Cardiologist", label: "Cardiologist" },
    { value: "Gynecologist", label: "Gynecologist" },
    { value: "ENT specialist", label: "ENT specialist" },
    { value: "Radiologist", label: "Radiologist" },
    { value: "Chiropodist", label: "Chiropodist" },
    { value: "Nutritionist", label: "Nutritionist	" },
    { value: "Physiologist", label: "Physiologist	" },
    { value: "Bacteriologist ", label: "Bacteriologist	" },
    { value: "Gastroenterologist", label: "Gastroenterologist" },
    { value: "Orthopedist", label: "Orthopedist" },
    { value: "Dermatologist", label: "Dermatologist" },
  ];

  return (
    <div className="flex h-screen items-center justify-center bg-bluee p-4 ">
      <form
        onSubmit={handleSubmit}
        className="flex w-80 flex-col gap-3 rounded-lg bg-white p-4 shadow-2xl "
      >
        <p>Fill the form with correct Information</p>
        <Input.Wrapper label="Hospital Name" id={id} required>
          <Input
            onChange={(e) => setName(e.target.value)}
            icon={<FaUser />}
            variant="filled"
            placeholder="Name"
          />
        </Input.Wrapper>
        <Input.Wrapper label="Hospital Contact No." id={id} required>
          <Input
            onChange={(e) => setContact(e.target.value)}
            icon={<FiPhone />}
            variant="filled"
            placeholder="Contact info"
          />
        </Input.Wrapper>
        <Input.Wrapper label="Hospital Email Id :" id={id} required>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            icon={<MdOutlineAlternateEmail />}
            variant="filled"
            placeholder="email Id"
          />
        </Input.Wrapper>
        <Input.Wrapper label="Admin Email Id :" id={id} required>
          <Input
            onChange={(e) => setAdminEmail(e.target.value)}
            icon={<MdOutlineAdminPanelSettings />}
            variant="filled"
            placeholder="admin email Id"
          />
        </Input.Wrapper>
        <MultiSelect
          icon={<BiCategory />}
          value={specializations}
          onChange={setSpecializations}
          data={data}
          variant="filled"
          label="Specializations"
          placeholder="Pick Your Specializations"
          nothingFound="Nothing found"
          clearable
          searchable
        />
        <Input.Wrapper label="Hospital Address" id={id} required>
          <Textarea
            icon={<CiHospital1 />}
            onChange={(e) => setAddress(e.target.value)}
            variant="filled"
            placeholder="Enter your address"
            withAsterisk
            minRows={1}
            maxRows={3}
          />
        </Input.Wrapper>
        <button className="rounded-sm bg-purplee p-2 text-white">
          Add Hospital
        </button>
      </form>
    </div>
  );
};

export default AddHospital;
