import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Select } from "@mantine/core";
import { MdOutlineAlternateEmail, MdLockOutline } from "react-icons/md";
import IMG_LOGIN from "../assets/DM 06.svg";
import LOGO from "../assets/PRANA-LOGO.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { RoleArr } from "../constants/index";

function LoginForm() {
  // const navigate = useNavigation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("logged in");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  if (user?.user.role === "ADMIN") navigate("/admin");
  else if (user?.user.role === "DOCTOR") navigate("/doctor");
  else if (user?.user.role === "PATIENT") navigate("/patient");
  else if (user?.user.role === "HOSPITAL") navigate("/hospital");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value === "" ? "Enter your password" : null),
      role: (value) => (value === "" ? "Invalid role" : null),
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: form.values.email,
      password: form.values.password,
      role: form.values.role,
    };
    console.log(userData);
    dispatch(login(userData));
  };
  const handleSubmit = (values) => {
    dispatch(login(values));
  };
  return (
    <div className="flex w-full flex-row      ">
      <div className="  mr-6 flex w-full flex-col gap-6 bg-white p-0 md:w-1/2 lg:w-1/2  ">
        <img src={LOGO} alt="logo" className="w-24 " />
        <form
          className=" text-darkBg"
          // onSubmit={}
        >
          <div className="text-3xl font-semibold  ">Log In</div>
          <p className="py-2 text-[0.65rem] font-light ">
            Please Input Your Details
          </p>
          <TextInput
            mt="sm"
            label="Email"
            variant="filled"
            placeholder="Email"
            icon={<MdOutlineAlternateEmail />}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            variant="filled"
            placeholder="Password"
            icon={<MdLockOutline />}
            {...form.getInputProps("password")}
          />
          <Select
            label="Login As :"
            variant="filled"
            placeholder="Pick one"
            nothingFound="No options"
            data={RoleArr}
            {...form.getInputProps("role")}
          />
          <a href="#" className="text-[0.65rem]">
            Forgot password ?
          </a>
          <button
            onClick={form.onSubmit((values) => handleSubmit(values))}
            className="my-3 w-full rounded-lg bg-purplee p-2 text-white hover:shadow-lg"
          >
            Login
          </button>
          <div className="flex flex-row justify-center text-center text-[0.65rem]">
            <p className=" ">Not registered yet? </p>
            <a className=" font-bold " href="../signup">
              &nbsp; create Account.
            </a>
          </div>
        </form>
      </div>
      <div className="hidden w-1/2 md:block lg:block">
        <img
          src={IMG_LOGIN}
          alt="img"
          className="h-full rounded-xl bg-bluee object-contain "
        />
      </div>
    </div>
  );
}
export default LoginForm;
