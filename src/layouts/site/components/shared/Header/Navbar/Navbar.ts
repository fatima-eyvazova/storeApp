import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Toolbar, Box, Button } from "@mui/material";
import { ROUTES } from "../../../../../../router/routeNames";
import { useTranslation } from "react-i18next";
import { linksBox, navbarBox, navbarToolbar, } from "../../../../../../constants";
const Navbar = () => {
    const { t } = useTranslation();
    return (_jsx(Box, { sx: navbarBox, children: _jsx(Toolbar, { sx: navbarToolbar, children: _jsxs(Box, { sx: linksBox, children: [_jsx(Button, { component: Link, to: ROUTES.home, color: "inherit", children: t("home") }), _jsx(Button, { component: Link, to: ROUTES.shop, color: "inherit", children: t("shop") }), _jsx(Button, { component: Link, to: ROUTES.favorites, color: "inherit", children: t("favorites") }), _jsx(Button, { component: Link, to: ROUTES.basket, color: "inherit", children: t("basket") })] }) }) }));
};
export default Navbar;
