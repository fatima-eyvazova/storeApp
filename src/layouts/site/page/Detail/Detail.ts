import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery, useGetOrdersQuery, useGiveFeedbackMutation, useAddRemoveFavoriteMutation, useGetProfileQuery, useAddNewBasketItemMutation, useGetProductReviewsQuery, } from "../../../../redux/slices/shared/apiSlice";
import { Typography, Box, Breadcrumbs, Link } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";
import ProductInfo from "../../components/Details/ProductInfo/ProductInfo";
import MainLayout from "../../components/shared/MainLayout/MainLayout";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import ProductReviewList from "../../components/Details/ProductReviewList";
import { detailBox, infoBox } from "../../../../constants";
import { ROUTES } from "../../../../router/routeNames";
const ProductDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const userId = useSelector((state) => state.auth.user);
    const { token, user } = useSelector((state) => state.auth);
    const [giveFeedback] = useGiveFeedbackMutation();
    const { data: userProfile } = useGetProfileQuery(userId);
    const { data: reviews, refetch: refetchReviews } = useGetProductReviewsQuery(id, {
        refetchOnMountOrArgChange: true,
    });
    const [addRemoveFavorite] = useAddRemoveFavoriteMutation();
    const [addToBasket] = useAddNewBasketItemMutation();
    const [localQuantity, setLocalQuantity] = useState(1);
    const { data } = useGetProductByIdQuery(id || "");
    const { data: ordersData } = useGetOrdersQuery({
        perPage: 10,
        page: 1,
        status: "delivered",
    });
    const product = data?.data;
    const favs = userProfile?.data?.user.favorites || [];
    const favorite = favs.find((pr) => pr?._id === product?._id);
    const [isFavorite, setIsFavorite] = useState(favorite);
    const isPurchased = () => {
        return ordersData?.data?.data?.some((order) => order.products.some((orderProduct) => orderProduct?.productId == id &&
            order?.customer?.userId == userId?._id));
    };
    const handleReviewSubmit = async (rating, review) => {
        try {
            const feedbackData = {
                product_id: product._id,
                review,
                rating,
            };
            await giveFeedback(feedbackData).unwrap();
            refetchReviews();
            alert("Review submitted successfully!");
        }
        catch (error) {
            console.error("Error submitting review:", error);
            alert("Error submitting review");
        }
    };
    const handleAddToBasket = useCallback(async (e) => {
        e.stopPropagation();
        if (token && user?.role === "client") {
            try {
                await addToBasket({
                    userId: user?._id,
                    productId: id,
                    productCount: localQuantity,
                });
                setLocalQuantity((prev) => prev + 1);
            }
            catch (error) {
                console.error("Basket update error:", error);
            }
        }
    }, [token, user?.role, localQuantity, addToBasket, id]);
    const handleFavoriteClick = useCallback((e) => {
        e.stopPropagation();
        setIsFavorite((prev) => !prev);
        addRemoveFavorite({
            product_id: id,
        });
    }, [id, addRemoveFavorite]);
    return (_jsx(MainLayout, { children: _jsx(Box, { py: 4, children: product && (_jsxs(Box, { children: [_jsxs(Box, { sx: detailBox, children: [_jsx(Typography, { variant: "h4", component: "h2", gutterBottom: true, children: product?.title }), _jsxs(Breadcrumbs, { "aria-label": "breadcrumb", separator: _jsx(IoIosArrowForward, { fontSize: "small" }), sx: { mb: 2 }, children: [_jsx(Link, { component: RouterLink, to: ROUTES.home, underline: "hover", color: "inherit", children: t("productDetailsTitle") }), _jsx(Typography, { color: "text.primary", children: product?.title })] })] }), _jsx(Box, { sx: infoBox, children: _jsx(ProductInfo, { handleFavoriteClick: handleFavoriteClick, handleAddToBasket: handleAddToBasket, isFavorite: isFavorite, product: product }) }), reviews?.data && (_jsx(ProductReviewList, { reviews: reviews?.data, handleReviewSubmit: handleReviewSubmit, isPurchased: isPurchased }))] })) }) }));
};
export default ProductDetails;
