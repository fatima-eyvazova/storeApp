import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, TextField, Button } from "@mui/material";
import { RootState } from "../../../../../redux/types";
import { useSelector } from "react-redux";
import { useAddStaffMutation } from "../../../../../redux/slices/shared/apiSlice";
import { schema } from "../../../../../validationSchema/addStaff";
import { ourStaffForm, ourStaffTypography } from "../../../../../constants";

interface FormValues {
  name: string;
  email: string;
  surname: string;
  password: string;
}

interface Props {
  setOpen: (bool: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddStaff = ({ setOpen, setUpdateList }: Props) => {
  const [err, setErr] = useState("");
  const { token } = useSelector((state: RootState) => state.auth);

  const [addStaff, { isLoading }] = useAddStaffMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      surname: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values: FormValues) => {
    try {
      const payload = {
        ...values,
        token,
      };

      const response = await addStaff(payload).unwrap();

      if (response.success) {
        setErr("");
        setOpen(false);
        setUpdateList((prev) => !prev);
      } else {
        setErr(response.message);
      }
    } catch (e) {
      setErr("An error occurred while adding staff.");
    }
  };

  const isBtnDisabled = !isValid || isLoading || !isDirty;

  return (
    <Box sx={{ padding: "50px", width: "40vw" }}>
      <Box>
        <Typography variant="h4" sx={ourStaffTypography}>
          Add Staff
        </Typography>
        <Typography sx={{ fontFamily: "sans-serif", fontSize: "16px" }}>
          Add necessary information for registering an admin from here
        </Typography>
      </Box>
      <form style={ourStaffForm} onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          {...register("name")}
        />
        {!!errors.name?.message && (
          <p style={{ color: "red" }}>{errors.name?.message}</p>
        )}

        <TextField
          label="Surname"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          {...register("surname")}
        />
        {!!errors.surname?.message && (
          <p style={{ color: "red" }}>{errors.surname?.message}</p>
        )}

        <TextField
          id="email-input"
          type="text"
          label="Email"
          variant="outlined"
          fullWidth
          required
          {...register("email")}
        />
        {!!errors.email?.message && (
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        )}

        <TextField
          id="password-input"
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          required
          {...register("password")}
        />
        {!!errors.password?.message && (
          <p style={{ color: "red" }}>{errors.password?.message}</p>
        )}

        {err && <p style={{ color: "red" }}>{err}</p>}

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={isBtnDisabled}
        >
          {isLoading ? "Adding..." : "Add Staff"}
        </Button>
      </form>
    </Box>
  );
};

export default AddStaff;
