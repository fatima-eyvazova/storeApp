import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { linkItem, linkItemIcone } from "../../../../../constants";
import { MenuItem } from "../type";

const LinkItem = ({ icon, name, isOpen, onClick }: MenuItem) => (
  <Box className="link" onClick={onClick} sx={linkItem}>
    <Box sx={linkItemIcone}>{icon}</Box>
    {isOpen && (
      <Typography sx={{ marginLeft: "10px", fontSize: "17px" }}>
        {name}
      </Typography>
    )}
  </Box>
);

export default LinkItem;
