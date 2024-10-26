import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
} from "@mui/material";
import { format } from "date-fns";
import FeedbackForm from "./FeedbackForm";

const ProductReviewList: React.FC<{ reviews: any[] }> = ({
  reviews,
  handleReviewSubmit,
  isPurchased,
}) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleCommentClick = () => {
    setShowFeedbackForm(true);
  };

  return (
    <Box
      sx={{
        mt: 4,
        width: { xs: "100%", md: "80%" },
        mx: "auto",
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 3,
        p: 3,
      }}
    >
      <Typography
        variant="h5"
        component="h3"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main", textAlign: "center" }}
      >
        Reviews
      </Typography>

      <List sx={{ maxHeight: "50vh", overflowY: "auto", padding: 0 }}>
        {reviews.map((review) => (
          <ListItem
            key={review._id}
            alignItems="flex-start"
            sx={{
              borderBottom: "1px solid #f0f0f0",
              mb: 2,
              padding: "16px 0",
            }}
          >
            <Avatar
              alt="User Avatar"
              src={review.userAvatar}
              sx={{ width: 50, height: 50, mr: 2 }}
            />
            <ListItemText
              primary={
                <>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "medium", color: "text.primary" }}
                  >
                    {review?.description}
                  </Typography>
                </>
              }
              secondary={
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 1 }}
                >
                  {format(new Date(review.createdAt), "dd MMM yyyy, HH:mm")}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>

      {!showFeedbackForm ? (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 3,
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#e4e5e9",
              },
            }}
            onClick={handleCommentClick}
          >
            Add a Comment
          </Button>
        </Box>
      ) : (
        <FeedbackForm onSubmit={handleReviewSubmit} isPurchased={isPurchased} />
      )}
    </Box>
  );
};

export default ProductReviewList;
