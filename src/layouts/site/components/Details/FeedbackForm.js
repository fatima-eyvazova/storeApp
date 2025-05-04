import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { FaStar } from "react-icons/fa";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { feedbackFormContainer, starIconStyle, starsStyle, submitButtonStyle, textFieldStyle, } from "../../../../constants";
const FeedbackForm = ({ onSubmit, isPurchased, }) => {
    const { t } = useTranslation();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const stars = [0, 1, 2, 3, 4];
    const handleStarClick = (index) => {
        setRating(index + 1);
    };
    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating > 0 && review) {
            await onSubmit(rating, review);
            setRating(0);
            setReview("");
        }
    };
    const renderStars = () => {
        return stars.map((index) => (_jsx(FaStar, { color: index < rating ? "#ffc107" : "#e4e5e9", onClick: () => handleStarClick(index), style: starsStyle }, index)));
    };
    if (!isPurchased)
        return null;
    return (_jsx(Box, { sx: feedbackFormContainer, children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: t("feedbackFormTitle") }), _jsx(Box, { sx: starIconStyle, children: renderStars() }), _jsx(TextField, { label: t("review"), value: review, onChange: handleReviewChange, multiline: true, rows: 4, sx: textFieldStyle, variant: "outlined" }), _jsx(Button, { variant: "contained", color: "primary", type: "submit", sx: submitButtonStyle, children: t("submit") })] }) }));
};
export default FeedbackForm;
