import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Button, Avatar, } from "@mui/material";
import { format } from "date-fns";
import FeedbackForm from "./FeedbackForm";
import { avatarStyle, boxStyle, buttonStyle, listItemStyles, listStyle, titleNewStyle, } from "../../../../constants";
const ProductReviewList = React.memo(({ reviews, handleReviewSubmit, isPurchased }) => {
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const handleCommentClick = () => {
        setShowFeedbackForm(true);
    };
    const purchased = isPurchased();
    console.log("purchased", purchased);
    return (_jsxs(Box, { sx: boxStyle, children: [_jsx(Typography, { variant: "h5", component: "h3", gutterBottom: true, sx: titleNewStyle, children: "Reviews" }), _jsx(List, { sx: listStyle, children: reviews.map((review) => (_jsxs(ListItem, { sx: listItemStyles, children: [_jsx(Avatar, { alt: "User Avatar", src: review.userAvatar, sx: avatarStyle }), _jsx(ListItemText, { primary: _jsx(_Fragment, { children: _jsx(Typography, { variant: "body1", sx: { fontWeight: "medium", color: "text.primary" }, children: review?.description }) }), secondary: _jsx(Typography, { variant: "body2", sx: { color: "text.secondary", mt: 1 }, children: format(new Date(review.createdAt), "dd MMM yyyy, HH:mm") }) })] }, review._id))) }), purchased && !showFeedbackForm && (_jsx(Box, { sx: { textAlign: "center", mt: 3 }, children: _jsx(Button, { variant: "outlined", sx: buttonStyle, onClick: handleCommentClick, children: "Add a Comment" }) })), showFeedbackForm && (_jsx(FeedbackForm, { onSubmit: handleReviewSubmit, isPurchased: isPurchased }))] }));
});
export default ProductReviewList;
