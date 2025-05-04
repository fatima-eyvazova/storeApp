import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Typography, CircularProgress, List, ListItem, } from "@mui/material";
import { useState } from "react";
import { ROUTES } from "../../../../../router/routeNames";
import MainLayout from "../../../components/shared/MainLayout/MainLayout";
import { registerSchema } from "../../../../../validationSchema/register";
import { useRegisterUserMutation } from "../../../../../redux/slices/shared/apiSlice";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { boxStyles, buttonStyles, innerBoxStyles, navigationListStyles, registerNavStyles, } from "../../../../../constants";
const Register = () => {
    const { t } = useTranslation();
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors, isValid, isDirty }, } = useForm({
        defaultValues: {
            name: "",
            password: "",
            email: "",
            surname: "",
        },
        resolver: yupResolver(registerSchema),
    });
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const handleFormSubmit = async (values) => {
        try {
            const response = await registerUser(values).unwrap();
            if (response?.success) {
                navigate(ROUTES.login);
            }
            else {
                setErr(response?.message || "Registration failed");
            }
        }
        catch (error) {
            setErr("An error occurred. Please try again.");
        }
    };
    return (_jsx(MainLayout, { children: _jsx(Box, { sx: boxStyles, children: _jsxs(Box, { sx: innerBoxStyles, children: [_jsxs(Box, { sx: { mb: 4 }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: "bold", textAlign: "center" }, children: t("account") }), _jsxs(List, { style: navigationListStyles, children: [_jsxs(ListItem, { children: [_jsx(Link, { to: ROUTES.home, className: "link", style: { textDecoration: "none" }, children: t("homeLogin") }), _jsx(IoIosArrowForward, {})] }), _jsx(ListItem, { children: _jsxs(Typography, { variant: "body1", children: [" ", t("account")] }) })] })] }), _jsxs(Box, { children: [_jsxs(Box, { sx: registerNavStyles, children: [_jsx(Link, { to: ROUTES.login, style: { textDecoration: "none" }, children: _jsxs(Typography, { variant: "h6", sx: { color: "black" }, children: [t("login"), " |"] }) }), _jsx(Link, { to: ROUTES.register, style: { textDecoration: "none" }, children: _jsx(Typography, { variant: "h6", sx: { fontWeight: "bold", color: "#26c6d0" }, children: t("register") }) })] }), _jsx("div", { children: _jsx("div", { children: _jsxs("form", { onSubmit: handleSubmit(handleFormSubmit), children: [_jsx(TextField, { label: t("first_name"), fullWidth: true, ...register("name"), error: !!errors.name, helperText: errors.name?.message, margin: "normal", variant: "outlined", sx: { mb: 2 } }), _jsx(TextField, { label: t("last_name"), fullWidth: true, ...register("surname"), error: !!errors.surname, helperText: errors.surname?.message, margin: "normal", variant: "outlined", sx: { mb: 2 } }), _jsx(TextField, { label: t("emailRegister"), type: "email", fullWidth: true, ...register("email"), error: !!errors.email, helperText: errors.email?.message, margin: "normal", variant: "outlined", sx: { mb: 2 } }), _jsx(TextField, { label: t("passwordRegister"), type: "password", fullWidth: true, ...register("password"), error: !!errors.password, helperText: errors.password?.message, margin: "normal", variant: "outlined", sx: { mb: 2 } }), err && (_jsx(Typography, { color: "error", sx: { mb: 2 }, children: err })), _jsx("div", { className: "button-box", style: { marginTop: 2 }, children: _jsx(Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, disabled: !isValid || isLoading || !isDirty, endIcon: isLoading && _jsx(CircularProgress, { size: 20 }), sx: buttonStyles, children: t("register") }) })] }) }) })] })] }) }) }));
};
export default Register;
