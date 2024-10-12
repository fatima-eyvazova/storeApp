import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../redux/slices/shared/authSlice";
import { ROUTES } from "../../../../router/routeNames";

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

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        width: "300px",
        zIndex: "10001",
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <IconButton
        aria-label="close"
        onClick={() => setOpenModal(false)}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Are you sure you want to log out?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button variant="contained" color="primary" onClick={logOut}>
          OK
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default LogOutModal;
