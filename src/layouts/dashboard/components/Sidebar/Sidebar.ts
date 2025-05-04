import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { TbBrandSafari, TbBrand4Chan } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../router/routeNames";
import LogOutModal from "../../../shared/modals/LogOutModal/LogOutModal";
import LinkItem from "./LinkItem/LinkItem";
import { sidebarBox } from "../../../../constants";
const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openLogoutModal, setOpenLogoutModal] = useState(false);
    const navigate = useNavigate();
    const adminInfo = useSelector((state) => state.auth.user);
    const userRole = adminInfo?.role;
    const menuItems = [
        {
            path: ROUTES.orders,
            name: "Orders",
            icon: _jsx(TbBrandSafari, {}),
        },
        {
            path: ROUTES.dashboardProducts,
            name: "Products",
            icon: _jsx(MdOutlineProductionQuantityLimits, {}),
        },
        {
            path: ROUTES.analyst,
            name: "Analyst",
            icon: _jsx(SiSimpleanalytics, {}),
        },
        {
            path: ROUTES.category,
            name: "Categories",
            icon: _jsx(TbBrand4Chan, {}),
        },
        {
            name: "Log Out",
            icon: _jsx(IoIosLogOut, {}),
        },
    ];
    if (userRole === "superadmin") {
        menuItems.splice(2, 0, {
            path: ROUTES.ourStaff,
            name: "Our Staff",
            icon: _jsx(RiAdminLine, {}),
        });
    }
    const logOutUserHandler = () => {
        setOpenLogoutModal(true);
    };
    const handleNavigation = (path) => {
        if (path) {
            navigate(path);
        }
        else {
            logOutUserHandler();
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Box, { sx: { display: "flex", height: "100vh" }, children: [_jsxs(Box, { sx: {
                            backgroundColor: "black",
                            color: "white",
                            width: isOpen ? "250px" : "60px",
                            transition: "width 0.3s ease",
                        }, children: [_jsxs(Box, { sx: sidebarBox, children: [isOpen && _jsx(Typography, { children: "Fayzelia \uD83D\uDECD\uFE0F" }), _jsx(Box, { sx: { cursor: "pointer", marginLeft: isOpen ? "0px" : "10px" }, children: _jsx(FaBars, { onClick: () => setIsOpen(!isOpen) }) })] }), menuItems.map((item, index) => (_jsx(LinkItem, { icon: item.icon, name: item.name, isOpen: isOpen, onClick: () => handleNavigation(item.path) }, index)))] }), _jsx(Box, { sx: { flex: 1, padding: "20px" }, children: children })] }), openLogoutModal && _jsx(LogOutModal, { setOpenModal: setOpenLogoutModal })] }));
};
export default Sidebar;
