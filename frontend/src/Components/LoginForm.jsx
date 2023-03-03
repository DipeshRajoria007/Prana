import { useForm } from "@mantine/form";
import { TextInput, PasswordInput } from "@mantine/core";
import { MdOutlineAlternateEmail, MdLockOutline } from "react-icons/md";

function LoginForm() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className="w-80 flex flex-col gap-3 bg-white p-4 rounded-lg shadow-2xl ">
      <form onSubmit={form.onSubmit(console.log)}>
        <div className="text-3xl font-semibold">Log In</div>
        <p className="text-[0.65rem] font-light py-2 ">
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
        <button
          type="submit"
          className="bg-purplee hover:shadow-lg rounded-sm my-3 p-2 w-full text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginForm;
