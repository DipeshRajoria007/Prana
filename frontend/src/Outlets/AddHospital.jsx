import { Input, Textarea, MultiSelect } from "@mantine/core";
import { FiPhone } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useId } from "@mantine/hooks";
import { useState } from "react";
import axios from "axios";
const AddHospital = () => {
  const id = useId();
  const [input, setInput] = useState({
    name: "",
    contact: null,
    email: "",
    address: "",
  });
  const [specialization, setSpecialization] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  console.log(specialization);

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:8000/api/addhospital", {
        name,
        contact,
        email,
        address,
        specialization,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => {
      alert("hostpial added successfully");
    });
  };

  const data = [
    { value: "All", label: "All" },
    { value: "general ", label: "General " },
    { value: "psychiatrist", label: "Psychiatrist" },
    { value: "neurologist", label: "Neurologist" },
    { value: "pediatrician", label: "Pediatrician" },
    { value: "cardiologist", label: "Cardiologist" },
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
    <div className="flex justify-center items-center p-4 bg-bluee h-screen ">
      <form
        onSubmit={handleSubmit}
        className="w-80 flex flex-col gap-3 bg-white p-4 rounded-lg shadow-2xl "
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
        <MultiSelect
          value={specialization}
          onChange={setSpecialization}
          data={data}
          variant="filled"
          label="Specialization"
          placeholder="Pick all that you like"
        />
        <Input.Wrapper label="Hospital Address" id={id} required>
          <Textarea
            onChange={(e) => setAddress(e.target.value)}
            variant="filled"
            placeholder="Enter your address"
            withAsterisk
          />
        </Input.Wrapper>
        <button className="bg-purplee rounded-sm p-2 text-white">
          Add Hospital
        </button>
      </form>
    </div>
  );
};

export default AddHospital;
