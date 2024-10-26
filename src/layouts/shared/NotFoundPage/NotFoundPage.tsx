import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/types";
import { Box, Typography, Button } from "@mui/material";
import {
  buttonStylesNotFound,
  notFoundBox,
  notFoundInfo,
  typographyStyles,
} from "../../../constants";

const NotFoundPage = ({ children }: { children?: JSX.Element }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role;

  const redirectToHome = () => {
    navigate(-1);
  };

  const roleMessage = () => {
    if (userRole === "client") {
      return "You must be logged in as admin or super admin.";
    } else {
      return "You must log in as a user.";
    }
  };

  return (
    <Box sx={notFoundBox}>
      <Typography variant="h1" sx={notFoundInfo}>
        Page Was Not Found!
      </Typography>

      <Typography variant="body1" sx={typographyStyles}>
        {roleMessage()}
      </Typography>

      {children ? (
        children
      ) : (
        <Button
          variant="contained"
          onClick={redirectToHome}
          sx={buttonStylesNotFound}
        >
          Return
        </Button>
      )}
    </Box>
  );
};

export default NotFoundPage;
