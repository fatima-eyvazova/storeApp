import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../router/routeNames";
import { collectionTitleStyles, imageContainerStyles, imageStyles, innovationsBoxStyles, innovationsContainerStyles, newArrivalsTextStyles, shopNowButtonStyles, shoppingExperienceTextStyles, } from "../../../../constants";
const Innovations = () => {
    const { t } = useTranslation();
    return (_jsx(Box, { sx: innovationsContainerStyles, children: _jsxs(Box, { sx: innovationsBoxStyles, children: [_jsxs(Box, { sx: {
                        padding: "48px 0 0",
                        textAlign: "center",
                    }, children: [_jsx(Typography, { variant: "h4", sx: newArrivalsTextStyles, children: t("newArrivals") }), _jsxs(Typography, { variant: "h2", sx: collectionTitleStyles, children: [t("womenCollection"), " ", _jsx("br", {}), t("autumnFashion")] }), _jsx(Typography, { sx: shoppingExperienceTextStyles, children: t("shoppingExperience") }), _jsx(Link, { to: ROUTES.shop, style: shopNowButtonStyles, children: t("shopNow") })] }), _jsx(Box, { sx: imageContainerStyles, children: _jsx(Box, { component: "img", src: "/src/assets/banner-6.webp", alt: "banner", sx: imageStyles }) })] }) }));
};
export default Innovations;
