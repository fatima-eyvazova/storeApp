import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../redux/slices/shared/authSlice";
import { ROUTES } from "../../../../router/routeNames";
import { logOutButton, logOutModalBox, logOutModalButton, } from "../../../../constants";
const LogOutModal = ({ setOpenModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOut = () => {
        dispatch(logoutUser());
        navigate(ROUTES.login);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    return (_jsxs(Box, { sx: logOutModalBox, children: [_jsx(IconButton, { "aria-label": "close", onClick: handleCloseModal, sx: logOutModalButton, children: _jsx(CloseIcon, {}) }), _jsx(Typography, { variant: "h6", component: "h2", sx: { mb: 2 }, children: "Are you sure you want to log out?" }), _jsxs(Box, { sx: logOutButton, children: [_jsx(Button, { variant: "contained", color: "primary", onClick: logOut, children: "OK" }), _jsx(Button, { variant: "outlined", color: "secondary", onClick: handleCloseModal, children: "Cancel" })] })] }));
};
export default LogOutModal;
