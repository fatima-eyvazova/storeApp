import { Box } from "@mui/system";
import {
  useGetProfileQuery,
  useGetSiteProductsQuery,
} from "../../../../redux/slices/shared/apiSlice";
import BannerSwiper from "../../components/Banner/BannerSwiper";
// import ProductCard from "../../components/ProductCard/ProductCard";
import SwiperProducts from "../../components/SwiperProducts/SwiperProducts";
import MainLayout from "../../components/shared/MainLayout/MainLayout";

const Home = () => {
  const { data: products } = useGetSiteProductsQuery();
  const { data: userProfile } = useGetProfileQuery();

  return (
    <MainLayout>
      <BannerSwiper />
      <SwiperProducts
        products={products}
        favs={userProfile?.data?.user.favorites || []}
      />
      <div className="products-list">
        {/* {products?.data?.product.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))} */}
      </div>
      <Box>
        <video
          data-module="video"
          autoplay="autoplay"
          playsinline=""
          muted="true"
          loop="loop"
          class="bg-video"
          tabindex="-1"
          data-video-bg-id="6362537213112"
          src="https://house-fastly-signed-eu-west-1-prod.brightcovecdn.com/media/v1/pmp4/static/clear/2924921183001/66331588-2d2d-4ee9-8290-8c2fa2f2fa27/d2f50519-a343-4ce6-b6fc-ea0a34f04a4c/main.mp4?fastly_token=NjcwNmZlMmFfMmFmZWRmNjEyZDM0NTk0OTM1MGFmZDM0YjE3NDEzYzhmNGYxMTYwMmFhMTgzYjJhZGMzMWMyOGM3YjUxOTU2Nl8vL2hvdXNlLWZhc3RseS1zaWduZWQtZXUtd2VzdC0xLXByb2QuYnJpZ2h0Y292ZWNkbi5jb20vbWVkaWEvdjEvcG1wNC9zdGF0aWMvY2xlYXIvMjkyNDkyMTE4MzAwMS82NjMzMTU4OC0yZDJkLTRlZTktODI5MC04YzJmYTJmMmZhMjcvZDJmNTA1MTktYTM0My00Y2U2LWI2ZmMtZWEwYTM0ZjA0YTRjL21haW4ubXA0"
          data-duration="5077"
          style={{ width: "100vw" }}
        ></video>
      </Box>
    </MainLayout>
  );
};

export default Home;
