import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Drawer, Button, IconButton, Box } from "@mui/material";
import { MdPersonAddAlt } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import AddStaff from "../AddStaff/AddStaff";
import { ourStaffIconeButton } from "../../../../../constants";
const OurStaffDrawer = ({ setUpdateList, }) => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const closeDrawer = () => {
        setOpen(false);
    };
    return (_jsxs("form", { onSubmit: (e) => e.preventDefault(), style: {
            display: "flex",
            alignItems: "center",
            gap: "1rem",
        }, children: [_jsx(Button, { variant: "contained", startIcon: _jsx(MdPersonAddAlt, {}), onClick: toggleDrawer, children: "Add Staff" }), _jsx(Drawer, { anchor: "right", open: open, onClose: closeDrawer, children: _jsxs(Box, { sx: {
                        padding: 2,
                        position: "relative",
                    }, children: [_jsx(IconButton, { onClick: closeDrawer, sx: ourStaffIconeButton, children: _jsx(CiCircleRemove, { size: 24 }) }), _jsx(AddStaff, { setOpen: setOpen, setUpdateList: setUpdateList })] }) })] }));
};
export default OurStaffDrawer;
