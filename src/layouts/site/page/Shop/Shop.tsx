import { useCallback, useState } from "react";
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
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterAccardions from "../../components/Shop/FilterAccardions/FilterAccardions";
import { useTranslation } from "react-i18next";
import {
  breadcrumbStyles,
  categoriesTitleStyles,
  productGridStyles,
  shopContainerStyles,
  shopContentStyles,
  shopListStyle,
  titleStyles,
} from "../../../../constants";
import { ROUTES } from "../../../../router/routeNames";

const Shop = () => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minMaxPrice, setMinMaxPrice] = useState({ min: 0, max: 0 });
  const [minPriceValue] = useDebounce(minMaxPrice.min, 500);
  const [maxPriceValue] = useDebounce(minMaxPrice.max, 500);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [inOutStock, setInOutStock] = useState({
    inStock: false,
    outStock: false,
  });
  const { t } = useTranslation();

  const buildQueryFilters = () => {
    let constructedQuery = "";
    if (selectedCategories.length) {
      selectedCategories.forEach((categoryId) => {
        constructedQuery += `&categoryId=${categoryId}`;
      });
    }
    if (minPriceValue) constructedQuery += `&minPrice=${minPriceValue}`;
    if (maxPriceValue) constructedQuery += `&maxPrice=${maxPriceValue}`;
    if (inOutStock.inStock) constructedQuery += "&stock=inStock";
    if (inOutStock.outStock) constructedQuery += "&stock=outStock";
    if (selectedRating) constructedQuery += `&rating=${selectedRating}`;

    return constructedQuery;
  };

  const { data, error, isLoading } = useGetSiteShopQuery({
    page: page + 1,
    perPage,
    filters: buildQueryFilters(),
  });

  const products = data?.data?.product || [];
  const totalCount = data?.data?.totalCount || 0;

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCategorySelection = useCallback((id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((category) => category !== id)
        : [...prev, id]
    );
  }, []);

  const handleRatingSelection = useCallback(
    (rating: number) => {
      if (selectedRating.includes(rating)) {
        setSelectedRating((prev) => prev.filter((r) => r !== rating));
      } else {
        setSelectedRating((prev) => [...prev, rating]);
      }
    },
    [selectedRating]
  );

  const handleInStockChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInOutStock((prev) => ({ ...prev, inStock: e.target.checked }));
    },
    []
  );

  const handleOutStockChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInOutStock((prev) => ({ ...prev, outStock: e.target.checked }));
    },
    []
  );

  const handleMinPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(0, +e.target.value);
      setMinMaxPrice((prev) => ({ ...prev, min: value }));
    },
    []
  );
  const handleMaxPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(0, +e.target.value);
      setMinMaxPrice((prev) => ({ ...prev, max: value }));
    },
    []
  );

  const rowsoptions = [5, 10, 20];

  return (
    <MainLayout>
      <Box sx={shopContainerStyles}>
        <Box sx={shopContentStyles}>
          <Box sx={{ textAlign: "center", marginBottom: "16px" }}>
            <Typography variant="h2" sx={titleStyles}>
              {t("shop")}
            </Typography>
            <Box sx={breadcrumbStyles}>
              <List sx={shopListStyle}>
                <ListItem>
                  <Link
                    to={ROUTES.home}
                    style={{
                      color: "#454545",
                      textDecoration: "none",
                    }}
                  >
                    {t("home")}
                  </Link>
                  <IoIosArrowForward />
                </ListItem>
                <ListItem>
                  <Typography component="span" sx={{ color: "#26c6d0" }}>
                    {t("shop")}
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Box>

          <Box sx={shopContainerStyles}>
            <Box sx={{ width: "270px" }}>
              <Typography variant="h4" sx={categoriesTitleStyles}>
                {t("categories")}
              </Typography>
              <FilterAccardions
                onCategorySelect={handleCategorySelection}
                onRatingSelect={handleRatingSelection}
                onInStockChange={handleInStockChange}
                onOutStockChange={handleOutStockChange}
                onMinPriceChange={handleMinPriceChange}
                onMaxPriceChange={handleMaxPriceChange}
                selectedCategories={selectedCategories}
                selectedRating={selectedRating}
                inOutStock={inOutStock}
                minMaxPrice={minMaxPrice}
              />
            </Box>

            <Box sx={{ width: "61vw" }}>
              {isLoading ? (
                <Typography>{t("loading")}</Typography>
              ) : error ? (
                <Typography>{t("errorFetching")}</Typography>
              ) : (
                <Box sx={productGridStyles}>
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </Box>
              )}

              <TablePagination
                rowsPerPageOptions={rowsoptions}
                component="div"
                count={totalCount}
                rowsPerPage={perPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Shop;
