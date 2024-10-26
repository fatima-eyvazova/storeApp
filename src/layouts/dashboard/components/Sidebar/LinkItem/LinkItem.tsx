import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const LinkItem = ({
  icon,
  name,
  isOpen,
  onClick,
}: {
  icon: JSX.Element;
  name: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <Box
    className="link"
    onClick={onClick}
    sx={{
      display: "flex",
      alignItems: "center",
      padding: "15px 20px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#555",
      },
    }}
  >
    <Box sx={{ marginRight: "10px", display: "flex", alignItems: "center" }}>
      {icon}
    </Box>
    {isOpen && (
      <Typography sx={{ marginLeft: "10px", fontSize: "17px" }}>
        {name}
      </Typography>
    )}
  </Box>
);

export default LinkItem;
