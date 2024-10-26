import {
  useGetProfileQuery,
  useGetSiteProductsQuery,
} from "../../../../redux/slices/shared/apiSlice";
import BannerSwiper from "../../components/Home/Banner/BannerSwiper";
import SwiperProducts from "../../components/SwiperProducts/SwiperProducts";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import Innovations from "../../components/Home/Innovations";

const Home = () => {
  const { data: productsData } = useGetSiteProductsQuery();
  const { data: userProfile } = useGetProfileQuery(undefined);
  const favorites = userProfile?.data?.user.favorites;
  const products = productsData || { data: { product: [] } };

  return (
    <MainLayout>
      <BannerSwiper />
      <SwiperProducts products={products} favs={favorites || []} />
      <Innovations />
    </MainLayout>
  );
};

export default Home;
