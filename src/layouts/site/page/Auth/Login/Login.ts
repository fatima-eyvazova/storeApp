import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Button, TextField, Typography, Box, List, ListItem, } from "@mui/material";
import { ROUTES } from "../../../../../router/routeNames";
import { useLoginUserMutation } from "../../../../../redux/slices/shared/apiSlice";
import { loginUser } from "../../../../../redux/slices/shared/authSlice";
import MainLayout from "../../../components/shared/MainLayout/MainLayout";
import { useTranslation } from "react-i18next";
import { useLoginSchema } from "../../../../../validationSchema/login";
import { accountInfo, containerStyle, linkStyle, loginBox, } from "../../../../../constants";
const Login = () => {
    const { t } = useTranslation();
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const schema = useLoginSchema();
    const { register, handleSubmit, formState: { errors, isValid, isDirty }, } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const [loginUserApi, { isLoading }] = useLoginUserMutation();
    const onSubmit = async (values) => {
        try {
            const data = await loginUserApi(values).unwrap();
            const isSuccess = data.success;
            if (isSuccess) {
                dispatch(loginUser(data.data));
                const userRole = data.data.user?.role;
                if (userRole === "admin" || userRole === "superadmin") {
                    navigate(ROUTES.orders);
                }
                else if (userRole === "client") {
                    navigate(ROUTES.home);
                }
            }
            else {
                setErr(data.message);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (error) {
            setErr(t("error"));
        }
    };
    return (_jsx(MainLayout, { children: _jsxs(Box, { sx: containerStyle, children: [_jsxs(Box, { mb: 3, children: [_jsx(Typography, { variant: "h4", children: t("account") }), _jsxs(List, { style: { display: "flex", listStyle: "none" }, children: [_jsxs(ListItem, { children: [_jsx(Link, { to: "/", style: { textDecoration: "none" }, children: t("homeLogin") }), _jsx(IoIosArrowForward, {})] }), _jsx(ListItem, { children: _jsx(Typography, { variant: "body1", sx: accountInfo, children: t("account") }) })] })] }), _jsxs(Box, { children: [_jsxs(Box, { sx: loginBox, children: [_jsx(Link, { to: ROUTES.login, style: linkStyle, children: _jsx(Typography, { variant: "h6", sx: { fontWeight: "bold", fontSize: "23px" }, children: t("login") }) }), _jsx(Link, { to: ROUTES.register, style: {
                                        textDecoration: "none",
                                        color: "black",
                                    }, children: _jsxs(Typography, { variant: "h6", sx: { fontWeight: "bold", fontSize: "23px" }, children: ["| ", t("register")] }) })] }), _jsx(Box, { children: _jsx(Box, { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(TextField, { label: t("email"), type: "email", fullWidth: true, margin: "normal", ...register("email"), error: !!errors.email, helperText: errors.email?.message }), _jsx(TextField, { label: t("password"), type: "password", fullWidth: true, margin: "normal", ...register("password"), error: !!errors.password, helperText: errors.password?.message }), err && _jsx(Typography, { color: "error", children: err }), _jsx(Box, { mt: 2, children: _jsx(Button, { type: "submit", variant: "contained", color: "primary", fullWidth: true, disabled: !isValid || isLoading || !isDirty, children: isLoading ? t("loading") : t("signIn") }) })] }) }) })] })] }) }));
};
export default Login;
