import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { linkItem, linkItemIcone } from "../../../../../constants";
const LinkItem = ({ icon, name, isOpen, onClick }) => (_jsxs(Box, { className: "link", onClick: onClick, sx: linkItem, children: [_jsx(Box, { sx: linkItemIcone, children: icon }), isOpen && (_jsx(Typography, { sx: { marginLeft: "10px", fontSize: "17px" }, children: name }))] }));
export default LinkItem;
