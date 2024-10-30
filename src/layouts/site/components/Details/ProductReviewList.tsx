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
import {
  avatarStyle,
  boxStyle,
  buttonStyle,
  listItemStyles,
  listStyle,
  titleNewStyle,
} from "../../../../constants";
import { ProductReviewListProps } from "../../page/Detail/type";

const ProductReviewList: React.FC<ProductReviewListProps> = ({
  reviews,
  handleReviewSubmit,
  isPurchased,
}) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleCommentClick = () => {
    setShowFeedbackForm(true);
  };

  return (
    <Box sx={boxStyle}>
      <Typography variant="h5" component="h3" gutterBottom sx={titleNewStyle}>
        Reviews
      </Typography>
      <List sx={listStyle}>
        {reviews.map((review) => (
          <ListItem key={review._id} sx={listItemStyles}>
            <Avatar
              alt="User Avatar"
              src={review.userAvatar}
              sx={avatarStyle}
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
      {isPurchased && !showFeedbackForm && (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="outlined"
            sx={buttonStyle}
            onClick={handleCommentClick}
          >
            Add a Comment
          </Button>
        </Box>
      )}
      {showFeedbackForm && (
        <FeedbackForm onSubmit={handleReviewSubmit} isPurchased={isPurchased} />
      )}
    </Box>
  );
};

export default ProductReviewList;
