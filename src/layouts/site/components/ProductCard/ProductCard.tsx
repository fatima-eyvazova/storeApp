import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAddRemoveFavoriteMutation } from "../../../../redux/slices/shared/apiSlice";

const ProductCard = ({ product }) => {
  const {
    _id: id,
    title,
    description,
    productPrice,
    salePrice,
    stock,
    images,
  } = product;

  const [addRemoveFavorite, result] = useAddRemoveFavoriteMutation();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    addRemoveFavorite({
      product_id: id,
    });
  };

  return (
    <>
      <Link to={`/products/${id}`} className="product-card" key={id}>
        <Card
          sx={{
            maxWidth: 345,
            margin: "16px",
            transition: "0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={images && images.length > 0 ? images[0].url : ""}
            alt={title}
            sx={{ objectFit: "fit" }}
          />
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {description}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h6" component="span" sx={{ mr: 1 }}>
                ${productPrice}
              </Typography>
              {salePrice < productPrice && (
                <Typography
                  variant="body2"
                  color="red"
                  sx={{ textDecoration: "line-through" }}
                >
                  ${salePrice}
                </Typography>
              )}
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: 1 }}
            >
              {stock > 0 ? `Mövcuddur: ${stock}` : "Mövcud deyil"}
            </Typography>
          </CardContent>
        </Card>
      </Link>
      <div style={{ position: "absolute", bottom: 0, left: 0 }}>
        <button onClick={handleFavoriteClick}>Favorite</button>
      </div>
    </>
  );
};

export default ProductCard;
