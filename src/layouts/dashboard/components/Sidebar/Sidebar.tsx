import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { TbBrandSafari, TbBrand4Chan } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { ROUTES } from "../../../../router/routeNames";

const Sidebar = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const menuItem = [
    {
      name: "Orders",
      path: "/orders",
      icon: <TbBrandSafari />,
    },
    {
      path: ROUTES.dashboardProducts,
      name: "Products",
      icon: <MdOutlineProductionQuantityLimits />,
    },
    {
      path: ROUTES.category,
      name: "Category",
      icon: <TbBrand4Chan />,
    },
    {
      name: "Log Out",
      icon: <IoIosLogOut />,
    },
  ];

  const handleNavigation = (path) => {
    toggleDrawer();
    navigate(path);
  };

  return (
    <>
      <Box>
        <Box>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              color: "#fff",
              backgroundColor: "#1f1f1f",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            <FaBars size={24} />
          </IconButton>

          <Drawer
            anchor="left"
            open={isOpen}
            onClose={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: "#1f1f1f",
                color: "#fff",
                width: 250,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 80,
                borderBottom: "1px solid #444",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Dashboard
              </Typography>
            </Box>

            <List>
              {menuItem.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#333",
                      cursor: "pointer",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#fff" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
        <main>{children}</main>
      </Box>
    </>
  );
};

export default Sidebar;
