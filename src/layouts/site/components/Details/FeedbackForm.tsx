import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { FaStar } from "react-icons/fa";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

interface FeedbackFormProps {
  onSubmit: (rating: number, review: string) => Promise<void>;
  isPurchased: boolean;
}

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && review) {
      await onSubmit(rating, review);
      setRating(0);
      setReview("");
    }
  };

  if (!isPurchased) return null;

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        p: 3,
        boxShadow: 1,
        mb: 4,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          {t("feedbackFormTitle")}
        </Typography>
        <Box sx={{ display: "flex", cursor: "pointer", mb: 2 }}>
          {stars.map((index) => (
            <FaStar
              key={index}
              color={index < rating ? "#ffc107" : "#e4e5e9"}
              onClick={() => handleStarClick(index)}
              style={{
                padding: "0 2px",
                fontSize: 30,
              }}
            />
          ))}
        </Box>
        <TextField
          label={t("review")}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          multiline
          rows={4}
          sx={{
            mb: 2,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
            },
          }}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            textTransform: "none",
            borderRadius: 1,
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          {t("submit")}
        </Button>
      </form>
    </Box>
  );
};

export default FeedbackForm;
