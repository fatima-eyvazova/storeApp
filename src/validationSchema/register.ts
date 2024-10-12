import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup.string().required("Email is required!"),
  password: yup.string().required("Password is required!"),
  name: yup
    .string()
    .required("First Nmae is required!")
    .min(2, "Length should be more than 2 characters!"),
  surname: yup.string().required("Last Name is required!"),
});
