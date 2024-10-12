import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TablePagination,
  List,
  ListItem,
} from "@mui/material";
import { useDebounce } from "use-debounce";
import { IoIosArrowForward } from "react-icons/io";
import { useGetSiteShopQuery } from "../../../../redux/slices/shared/apiSlice";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import FilterAccardions from "../../components/Shop/FilterAccardions/FilterAccardions";
import ProductCard from "../../components/ProductCard/ProductCard";

const Shop = () => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minMaxPrice, setMinMaxPrice] = useState({ min: 0, max: 0 });
  const [minPriceValue] = useDebounce(minMaxPrice.min, 500);
  const [maxPriceValue] = useDebounce(minMaxPrice.max, 500);
  const [inOutStock, setInOutStock] = useState({
    inStock: false,
    outStock: false,
  });

  const buildQueryFilters = () => {
    let constructedQuery = "";
    if (selectedCategories.length) {
      selectedCategories.forEach((brId) => {
        constructedQuery += `&brandId=${brId}`;
      });
    }
    if (minPriceValue) constructedQuery += `&minPrice=${minPriceValue}`;
    if (maxPriceValue) constructedQuery += `&maxPrice=${maxPriceValue}`;
    if (inOutStock.inStock) constructedQuery += "&stock=inStock";
    if (inOutStock.outStock) constructedQuery += "&stock=outStock";

    return constructedQuery;
  };

  const { data, error, isLoading } = useGetSiteShopQuery({
    page: page + 1,
    perPage,
    filters: buildQueryFilters(),
  });

  const products = data?.data?.product || [];
  const totalCount = data?.data?.totalCount || 0;

  return (
    <MainLayout>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            padding: "75px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "90vw",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: "16px" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: "36px",
                fontWeight: 600,
                letterSpacing: "0.2px",
                textTransform: "uppercase",
                color: "#454545",
              }}
            >
              Shop
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <List
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ListItem>
                  <Link
                    to="/"
                    style={{
                      color: "#454545",
                      textDecoration: "none",
                    }}
                  >
                    Home
                  </Link>
                  <IoIosArrowForward />
                </ListItem>
                <ListItem>
                  <Typography component="span" sx={{ color: "#26c6d0" }}>
                    Shop
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "30px",
            }}
          >
            <Box sx={{ width: "270px" }}>
              <Typography
                variant="h4"
                sx={{
                  backgroundColor: "#26c6d0",
                  color: "#fff",
                  padding: "20px 30px",
                  fontWeight: 700,
                  marginBottom: "10px",
                  textTransform: "capitalize",
                }}
              >
                Categories
              </Typography>
              <FilterAccardions
                setSelectedCategories={setSelectedCategories}
                selectedCategories={selectedCategories}
                setMinMaxPrice={setMinMaxPrice}
                setInOutStock={setInOutStock}
              />
            </Box>

            <Box sx={{ width: "61vw" }}>
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : error ? (
                <Typography>Error fetching products</Typography>
              ) : (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </Box>
              )}

              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={totalCount}
                rowsPerPage={perPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Shop;
