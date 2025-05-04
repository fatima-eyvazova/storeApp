import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { buttonStylesNotFound, notFoundBox, notFoundInfo, typographyStyles, } from "../../../constants";
const NotFoundPage = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const userRole = user?.role;
    const redirectToHome = () => {
        navigate(-1);
    };
    const roleMessage = () => {
        if (userRole === "client") {
            return "You must be logged in as admin or super admin.";
        }
        else {
            return "You must log in as a user.";
        }
    };
    return (_jsxs(Box, { sx: notFoundBox, children: [_jsx(Typography, { variant: "h1", sx: notFoundInfo, children: "Page Was Not Found!" }), _jsx(Typography, { variant: "body1", sx: typographyStyles, children: roleMessage() }), children ? (children) : (_jsx(Button, { variant: "contained", onClick: redirectToHome, sx: buttonStylesNotFound, children: "Return" }))] }));
};
export default NotFoundPage;
