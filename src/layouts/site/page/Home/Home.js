import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGetProfileQuery, useGetSiteProductsQuery, } from "../../../../redux/slices/shared/apiSlice";
import BannerSwiper from "../../components/Home/Banner/BannerSwiper";
import SwiperProducts from "../../components/SwiperProducts/SwiperProducts";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import Innovations from "../../components/Home/Innovations";
const Home = () => {
    const { data: productsData } = useGetSiteProductsQuery();
    const { data: userProfile } = useGetProfileQuery(undefined);
    const favorites = userProfile?.data?.user.favorites;
    const products = productsData || { data: { product: [] } };
    return (_jsxs(MainLayout, { children: [_jsx(BannerSwiper, {}), _jsx(SwiperProducts, { products: products, favs: favorites || [] }), _jsx(Innovations, {})] }));
};
export default Home;
