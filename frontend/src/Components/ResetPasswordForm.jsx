import { useUpdateUserPasswordMutation } from "../features/Api/adminApi";
import { useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { PasswordInput, TextInput } from "@mantine/core";

const ResetPasswordForm = () => {
  const {
    user: { user },
  } = useSelector((state) => state.auth);
  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationRules: {
      currentPassword: [{ required: true, error: "Password is required" }],
      newPassword: [{ required: true, error: "new password is required" }],
      confirmPassword: [
        { required: true, error: "Confirm password is required" },
        {
          validator: (value) => value === values.password,
          error: "Passwords do not match",
        },
      ],
    },
    // onSubmit: async (formData) => {
    //   console.log(formData);
    //   await updatePassword({ id: patientId, password: formData.password });

    //   alert("Password updated successfully");
    //   handleChange({ target: { name: "password", value: "" } });
    //   handleChange({ target: { name: "confirmPassword", value: "" } });
    // },
  });
  const handleSubmit = (values) => {
    console.log(values);
    const payload = {
      ...values,
      role: "PATIENT",
      doctor: user._id,
    };
    console.log(payload);
  };

  const [updatePassword, { isLoading }] = useUpdateUserPasswordMutation();

  return (
    <div className="rounded-lg bg-white  p-4 drop-shadow-2xl ">
      <h1 className="text-2xl font-semibold ">Reset Password Form</h1>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        className="flex flex-col gap-4  "
      >
        <PasswordInput
          label="Current Password"
          placeholder="Enter your old password"
          variant="filled"
          {...form.getInputProps("currentPassword")}
        />

        <PasswordInput
          placeholder="Enter new password"
          label="New Password"
          variant="filled"
          onChange={form.handleChange}
          {...form.getInputProps("newPassword")}
        />
        <PasswordInput
          placeholder="Enter confirm password"
          label="Confirm Password"
          onChange={form.handleChange}
          variant="filled"
          {...form.getInputProps("confirmPassword")}
        />
        <button className="w-48 rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-700 ">
          {form.isLoading ? "Loading..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
