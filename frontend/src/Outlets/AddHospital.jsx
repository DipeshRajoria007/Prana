import {
  Input,
  Textarea,
  MultiSelect,
  Autocomplete,
  Select,
  SelectChevronIcon,
} from "@mantine/core";
import { FiPhone } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { CiHospital1 } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { cities } from "../constants/index";
import {
  MdOutlineAlternateEmail,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { useId } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { useAddHospitalMutation } from "../features/Api/adminApi";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";
const AddHospital = () => {
  const id = useId();
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [pincode, setPincode] = useState();
  const [specializations, setSpecializations] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState();
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
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
      address: {
        state: selectedState,
        city: selectedCity,
        pincode,
        street,
      },
      specializations,
      adminEmail,
      role: "HOSPITAL",
    };
    console.log(payload);
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
        className=" flex flex-col gap-3 rounded-lg bg-white p-4 shadow-2xl "
      >
        <p>Fill the form with correct Information</p>
        <div className="grid grid-flow-col gap-2">
          <div className="w-96">
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
              className="w-full"
            />
          </div>
          <div className="w-96">
            <Input.Wrapper label="Hospital Address" id={id} required>
              <Textarea
                icon={<CiHospital1 />}
                onChange={(e) => setStreet(e.target.value)}
                variant="filled"
                placeholder="Enter your address"
                withAsterisk
                minRows={1}
                maxRows={3}
              />
            </Input.Wrapper>
            <Autocomplete
              withAsterisk
              variant="filled"
              label="State"
              placeholder="Select your state"
              data={Object.keys(cities)}
              value={selectedState}
              onChange={(value) => {
                return setSelectedState(value);
              }}
              // {...register("state", { required: "This field is required" })}
              // error={errors.state && errors.state.message}
            />
            <Select
              maxDropdownHeight={280}
              withAsterisk
              searchable
              label="City"
              variant="filled"
              placeholder="Select your city"
              data={cities[selectedState] ? cities[selectedState] : []}
              onChange={(value) => setSelectedCity(value)}
              // {...register("city", { required: "This field is required" })}
              // error={errors.city && errors.city.message}
            />
            <Input.Wrapper label="Pincode" required>
              <Input
                label="Pincode"
                variant="filled"
                placeholder="Enter your pincode"
                type="number"
                onChange={(e) => setPincode(e.target.value)}
              />
            </Input.Wrapper>
          </div>
        </div>
        <button className="rounded-sm bg-purplee p-2 text-white">
          Add Hospital
        </button>
      </form>
    </div>
  );
};

export default AddHospital;
