import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGetProfileQuery } from "../../../../redux/slices/shared/apiSlice";
import { Container, Typography, Box } from "@mui/material";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import { useTranslation } from "react-i18next";
import { favoriteItemStyle } from "../../../../constants";
import ProductCard from "../../components/Products/ProductCard";
const Favorites = () => {
    const { t } = useTranslation();
    const { data: userProfile } = useGetProfileQuery();
    const favoriteData = userProfile?.data?.user?.favorites || [];
    return (_jsx(MainLayout, { children: _jsxs(Container, { children: [_jsx(Typography, { variant: "h4", sx: { marginTop: 4 }, children: t("titleFavorite") }), favoriteData.length === 0 ? (_jsx(Box, { sx: {
                        mt: 2,
                        height: "35vh",
                    }, children: _jsx(Typography, { variant: "h6", children: t("noProducts") }) })) : (_jsx(Box, { sx: favoriteItemStyle, children: favoriteData.map((product) => (_jsx(Box, { sx: { width: { xs: "100%", sm: "48%", md: "30%" } }, children: _jsx(ProductCard, { product: product, favs: favoriteData }) }, product._id))) }))] }) }));
};
export default Favorites;
