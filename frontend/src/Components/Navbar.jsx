import { useState, useEffect, memo } from "react";
import { navLinks } from "../constants";
import logo from "../assets/PRANA-LOGO.png";
import { RiArrowDropRightLine, RiMenu2Fill, RiCloseFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";
import { MdOutlineAlternateEmail, MdLockOutline } from "react-icons/md";
import IMG_LOGIN from "../assets/DM 06.svg";
import LOGO from "../assets/PRANA-LOGO.png";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import LoginForm from "./LoginForm";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
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

  const formData = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: formData.values.email,
      password: formData.values.password,
    };
    console.log(userData);
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <nav className="relative flex w-full items-center justify-between py-3 ">
      <img src={logo} alt="logo" className="h-[32px] w-[124px] " />
      <ul className="hidden flex-1 list-none items-center justify-end sm:flex ">
        {navLinks.map((nav, idx) => (
          <li
            key={nav.id}
            className={` mr-10 cursor-pointer text-[16px] font-normal text-blackk `}
          >
            <a href={nav.href}>{nav.title}</a>
          </li>
        ))}
        <button
          onClick={open}
          className="  flex items-center rounded-full bg-purplee px-6 py-2 text-white duration-300 ease-in-out hover:shadow-2xl "
        >
          Login <RiArrowDropRightLine className="text-3xl" />
        </button>
      </ul>
      <div className="flex flex-1 items-center justify-end text-blackk sm:hidden  ">
        <div
          onClick={() => setToggle((prev) => !prev)}
          className="text-[24px ]"
        >
          {toggle ? <RiCloseFill /> : <RiMenu2Fill />}
        </div>
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } sidebar absolute right-0 top-20 mx-4 my-2 min-w-[140px] rounded-xl bg-pinkk p-6 `}
        >
          <ul className="flex flex-1 list-none flex-col items-center justify-end  ">
            {navLinks.map((nav, idx) => (
              <li
                key={nav.id}
                className={` mb-4 cursor-pointer text-[16px] font-normal text-blackk `}
              >
                <a href="/">{nav.title}</a>
              </li>
            ))}
            <button
              onClick={open}
              className="flex items-center rounded-full bg-purplee px-6 py-2 text-white duration-300 ease-in-out hover:shadow-2xl "
            >
              Login <RiArrowDropRightLine className="text-3xl" />
            </button>
          </ul>
        </div>
      </div>
      <Modal opened={opened} onClose={close} size="lg" withCloseButton={false}>
        <LoginForm />
      </Modal>
    </nav>
  );
};

export default Navbar;
