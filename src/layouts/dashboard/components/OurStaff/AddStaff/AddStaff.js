import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useAddStaffMutation } from "../../../../../redux/slices/shared/apiSlice";
import { schema } from "../../../../../validationSchema/addStaff";
import { ourStaffForm, ourStaffTypography } from "../../../../../constants";
const AddStaff = ({ setOpen, setUpdateList }) => {
    const [err, setErr] = useState("");
    const { token } = useSelector((state) => state.auth);
    const [addStaff, { isLoading }] = useAddStaffMutation();
    const { register, handleSubmit, formState: { errors, isValid, isDirty }, } = useForm({
        defaultValues: {
            name: "",
            email: "",
            surname: "",
            password: "",
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const handleFormSubmit = async (values) => {
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
            }
            else {
                setErr(response.message);
            }
        }
        catch (e) {
            setErr("An error occurred while adding staff.");
        }
    };
    const isBtnDisabled = !isValid || isLoading || !isDirty;
    return (_jsxs(Box, { sx: { padding: "50px", width: "40vw" }, children: [_jsxs(Box, { children: [_jsx(Typography, { variant: "h4", sx: ourStaffTypography, children: "Add Staff" }), _jsx(Typography, { sx: { fontFamily: "sans-serif", fontSize: "16px" }, children: "Add necessary information for registering an admin from here" })] }), _jsxs("form", { style: ourStaffForm, onSubmit: handleSubmit(handleFormSubmit), children: [_jsx(TextField, { label: "Name", variant: "outlined", fullWidth: true, margin: "normal", required: true, ...register("name") }), !!errors.name?.message && (_jsx("p", { style: { color: "red" }, children: errors.name?.message })), _jsx(TextField, { label: "Surname", variant: "outlined", fullWidth: true, margin: "normal", required: true, ...register("surname") }), !!errors.surname?.message && (_jsx("p", { style: { color: "red" }, children: errors.surname?.message })), _jsx(TextField, { id: "email-input", type: "text", label: "Email", variant: "outlined", fullWidth: true, required: true, ...register("email") }), !!errors.email?.message && (_jsx("p", { style: { color: "red" }, children: errors.email?.message })), _jsx(TextField, { id: "password-input", type: "password", label: "Password", variant: "outlined", fullWidth: true, required: true, ...register("password") }), !!errors.password?.message && (_jsx("p", { style: { color: "red" }, children: errors.password?.message })), err && _jsx("p", { style: { color: "red" }, children: err }), _jsx(Button, { variant: "contained", color: "primary", size: "large", type: "submit", disabled: isBtnDisabled, children: isLoading ? "Adding..." : "Add Staff" })] })] }));
};
export default AddStaff;
