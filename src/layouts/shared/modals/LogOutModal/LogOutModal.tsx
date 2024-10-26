import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../redux/slices/shared/authSlice";
import { ROUTES } from "../../../../router/routeNames";
import {
  logOutButton,
  logOutModalBox,
  logOutModalButton,
} from "../../../../constants";

interface Props {
  setOpenModal: (bool: boolean) => void;
}

const LogOutModal = ({ setOpenModal }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logoutUser());
    navigate(ROUTES.login);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Box sx={logOutModalBox}>
      <IconButton
        aria-label="close"
        onClick={handleCloseModal}
        sx={logOutModalButton}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Are you sure you want to log out?
      </Typography>
      <Box sx={logOutButton}>
        <Button variant="contained" color="primary" onClick={logOut}>
          OK
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default LogOutModal;
