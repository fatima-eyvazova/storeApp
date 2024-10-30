import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { FaStar } from "react-icons/fa";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import {
  feedbackFormContainer,
  starIconStyle,
  starsStyle,
  submitButtonStyle,
  textFieldStyle,
} from "../../../../constants";
import { FeedbackFormProps } from "../../page/Detail/type";

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onSubmit,
  isPurchased,
}) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const stars = [0, 1, 2, 3, 4];

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && review) {
      await onSubmit(rating, review);
      setRating(0);
      setReview("");
    }
  };

  const renderStars = () => {
    return stars.map((index) => (
      <FaStar
        key={index}
        color={index < rating ? "#ffc107" : "#e4e5e9"}
        onClick={() => handleStarClick(index)}
        style={starsStyle}
      />
    ));
  };
  if (!isPurchased) return null;

  return (
    <Box sx={feedbackFormContainer}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          {t("feedbackFormTitle")}
        </Typography>
        <Box sx={starIconStyle}>{renderStars()}</Box>
        <TextField
          label={t("review")}
          value={review}
          onChange={handleReviewChange}
          multiline
          rows={4}
          sx={textFieldStyle}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={submitButtonStyle}
        >
          {t("submit")}
        </Button>
      </form>
    </Box>
  );
};

export default FeedbackForm;
