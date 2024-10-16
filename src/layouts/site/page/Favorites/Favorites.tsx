import { useGetProfileQuery } from "../../../../redux/slices/shared/apiSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Container, Typography, Box } from "@mui/material";
import MainLayout from "../../components/shared/MainLayout/MainLayout";

const Favorites = () => {
  const { data: userProfile } = useGetProfileQuery();
  const favoriteData = userProfile?.data?.user?.favorites || [];

  return (
    <MainLayout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Favorite Products
        </Typography>
        {favoriteData.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="h6">No products have been added.</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
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
