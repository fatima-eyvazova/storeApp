import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, TablePagination, List, ListItem, } from "@mui/material";
import { useDebounce } from "use-debounce";
import { IoIosArrowForward } from "react-icons/io";
import { useGetSiteShopQuery } from "../../../../redux/slices/shared/apiSlice";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import FilterAccardions from "../../components/Shop/FilterAccardions/FilterAccardions";
import { useTranslation } from "react-i18next";
import { breadcrumbStyles, categoriesTitleStyles, productGridStyles, shopContainerStyles, shopContentStyles, shopListStyle, titleStyles, } from "../../../../constants";
import { ROUTES } from "../../../../router/routeNames";
import ProductCard from "../../components/Products/ProductCard";
const Shop = () => {
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [minMaxPrice, setMinMaxPrice] = useState({ min: 0, max: 0 });
    const [minPriceValue] = useDebounce(minMaxPrice.min, 500);
    const [maxPriceValue] = useDebounce(minMaxPrice.max, 500);
    const [selectedRating, setSelectedRating] = useState([]);
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
        if (minPriceValue)
            constructedQuery += `&minPrice=${minPriceValue}`;
        if (maxPriceValue)
            constructedQuery += `&maxPrice=${maxPriceValue}`;
        if (inOutStock.inStock)
            constructedQuery += "&stock=inStock";
        if (inOutStock.outStock)
            constructedQuery += "&stock=outStock";
        if (selectedRating)
            constructedQuery += `&rating=${selectedRating}`;
        return constructedQuery;
    };
    const { data, error, isLoading } = useGetSiteShopQuery({
        page: page + 1,
        perPage,
        filters: buildQueryFilters(),
    });
    const products = data?.data?.product || [];
    const totalCount = data?.data?.totalCount || 0;
    const handlePageChange = (_, newPage) => {
        setPage(newPage);
    };
    const handleRowsPerPageChange = (event) => {
        setPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleCategorySelection = useCallback((id) => {
        setSelectedCategories((prev) => prev.includes(id)
            ? prev.filter((category) => category !== id)
            : [...prev, id]);
    }, []);
    const handleRatingSelection = useCallback((rating) => {
        if (selectedRating.includes(rating)) {
            setSelectedRating((prev) => prev.filter((r) => r !== rating));
        }
        else {
            setSelectedRating((prev) => [...prev, rating]);
        }
    }, [selectedRating]);
    const handleInStockChange = useCallback((e) => {
        setInOutStock((prev) => ({ ...prev, inStock: e.target.checked }));
    }, []);
    const handleOutStockChange = useCallback((e) => {
        setInOutStock((prev) => ({ ...prev, outStock: e.target.checked }));
    }, []);
    const handleMinPriceChange = useCallback((e) => {
        const value = Math.max(0, +e.target.value);
        setMinMaxPrice((prev) => ({ ...prev, min: value }));
    }, []);
    const handleMaxPriceChange = useCallback((e) => {
        const value = Math.max(0, +e.target.value);
        setMinMaxPrice((prev) => ({ ...prev, max: value }));
    }, []);
    const rowsoptions = [5, 10, 20];
    return (_jsx(MainLayout, { children: _jsx(Box, { sx: shopContainerStyles, children: _jsxs(Box, { sx: shopContentStyles, children: [_jsxs(Box, { sx: { textAlign: "center", marginBottom: "16px" }, children: [_jsx(Typography, { variant: "h2", sx: titleStyles, children: t("shop") }), _jsx(Box, { sx: breadcrumbStyles, children: _jsxs(List, { sx: shopListStyle, children: [_jsxs(ListItem, { children: [_jsx(Link, { to: ROUTES.home, style: {
                                                        color: "#454545",
                                                        textDecoration: "none",
                                                    }, children: t("home") }), _jsx(IoIosArrowForward, {})] }), _jsx(ListItem, { children: _jsx(Typography, { component: "span", sx: { color: "#26c6d0" }, children: t("shop") }) })] }) })] }), _jsxs(Box, { sx: shopContainerStyles, children: [_jsxs(Box, { sx: { width: "270px" }, children: [_jsx(Typography, { variant: "h4", sx: categoriesTitleStyles, children: t("categories") }), _jsx(FilterAccardions, { onCategorySelect: handleCategorySelection, onRatingSelect: handleRatingSelection, onInStockChange: handleInStockChange, onOutStockChange: handleOutStockChange, onMinPriceChange: handleMinPriceChange, onMaxPriceChange: handleMaxPriceChange, selectedCategories: selectedCategories, selectedRating: selectedRating, inOutStock: inOutStock, minMaxPrice: minMaxPrice })] }), _jsxs(Box, { sx: { width: "61vw" }, children: [isLoading ? (_jsx(Typography, { children: t("loading") })) : error ? (_jsx(Typography, { children: t("errorFetching") })) : (_jsx(Box, { sx: productGridStyles, children: products.map((product) => (_jsx(ProductCard, { product: product }, product._id))) })), _jsx(TablePagination, { rowsPerPageOptions: rowsoptions, component: "div", count: totalCount, rowsPerPage: perPage, page: page, onPageChange: handlePageChange, onRowsPerPageChange: handleRowsPerPageChange })] })] })] }) }) }));
};
export default Shop;
