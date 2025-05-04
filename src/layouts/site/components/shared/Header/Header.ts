import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toolbar, IconButton, Box, Select, MenuItem, Typography, } from "@mui/material";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar/Navbar";
import { ROUTES } from "../../../../../router/routeNames";
import LogOutModal from "../../../../shared/modals/LogOutModal/LogOutModal";
import AdminSiteInfo from "./AdminSiteInfo";
import { languageBox, languageTypography, loginBoxButton, } from "../../../../../constants";
const Header = () => {
    const [openLogoutModal, setOpenLogoutModal] = useState(false);
    const { i18n } = useTranslation();
    const { token, user } = useSelector((state) => state.auth);
    const userRole = user?.role;
    const logOutUserHandler = (e) => {
        e.preventDefault();
        setOpenLogoutModal(true);
    };
    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Box, { sx: { position: "static", backgroundColor: "#e9ecef" }, children: _jsxs(Toolbar, { children: [_jsx(Box, { sx: { flexGrow: 1 }, children: _jsx(Link, { to: ROUTES.home, style: { textDecoration: "none" }, children: _jsx(Typography, { variant: "h4", sx: languageTypography, children: _jsx(AdminSiteInfo, {}) }) }) }), _jsxs(Box, { sx: languageBox, children: [_jsxs(Select, { value: i18n.language, onChange: handleLanguageChange, sx: { marginRight: "16px" }, children: [_jsx(MenuItem, { value: "en", children: "English" }), _jsx(MenuItem, { value: "ru", children: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" }), _jsx(MenuItem, { value: "az", children: "Az\u0259rbaycanca" })] }), userRole === "client" && token && (_jsx(Box, { onClick: logOutUserHandler, sx: { fontSize: "22px" }, children: _jsx(CiLogin, {}) })), _jsx(Box, { sx: loginBoxButton, children: !token && (_jsx(Link, { to: ROUTES.login, children: _jsx(IconButton, { children: _jsx(FaRegUserCircle, {}) }) })) })] })] }) }), _jsx(Navbar, {}), openLogoutModal && _jsx(LogOutModal, { setOpenModal: setOpenLogoutModal })] }));
};
export default Header;
