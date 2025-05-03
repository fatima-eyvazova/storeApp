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

  return (
    <MainLayout>
      <Container>
        <Typography variant="h4" sx={{ marginTop: 4 }}>
          {t("titleFavorite")}
        </Typography>
        {favoriteData.length === 0 ? (
          <Box
            sx={{
              mt: 2,
              height: "35vh",
            }}
          >
            <Typography variant="h6">{t("noProducts")}</Typography>
          </Box>
        ) : (
          <Box sx={favoriteItemStyle}>
            {favoriteData.map((product) => (
              <Box
                key={product._id}
                sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}
              >
                <ProductCard product={product} favs={favoriteData} />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </MainLayout>
  );
};

export default Favorites;
