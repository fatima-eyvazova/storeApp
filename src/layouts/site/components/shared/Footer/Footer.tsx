import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineLocalPhone, MdOutlineEmail } from "react-icons/md";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaGooglePlusG,
} from "react-icons/fa";
import { FaRss } from "react-icons/fa6";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  Avatar,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        backgroundColor: "black",
        height: "20vw",
        color: "white",
      }}
    >
      <Box sx={{ width: "90vw" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src="/src/assets/images/logo.png"
                alt="logo"
                sx={{ width: 56, height: 56 }}
              />
              <Typography variant="h6" sx={{ ml: 2 }}>
                Dilan
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                fontSize: "19px",
                marginTop: "30px",
              }}
            >
              Copyright © 2023
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                dilan
              </Link>
              . <br /> All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6">Information</Typography>
            <List>
              <ListItem>Specials</ListItem>
              <ListItem>New products</ListItem>
              <ListItem>Top sellers</ListItem>
              <ListItem>Our stores</ListItem>
              <ListItem>Contact us</ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6">My Account</Typography>
            <List>
              <ListItem>My orders</ListItem>
              <ListItem>My credit slips</ListItem>
              <ListItem>My addresses</ListItem>
              <ListItem>My personal info</ListItem>
              <ListItem>My wishlist</ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6">Quick Links</Typography>
            <List>
              <ListItem>New User</ListItem>
              <ListItem>Help Center</ListItem>
              <ListItem>Refund Policy</ListItem>
              <ListItem>Report Spam</ListItem>
              <ListItem>FAQs</ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              Contact Us
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <IoHomeOutline />
                </ListItemIcon>
                <Typography>Your store address goes here</Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MdOutlineLocalPhone />
                </ListItemIcon>
                <Typography>+012 333 456789</Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MdOutlineEmail />
                </ListItemIcon>
                <Typography>info@example.com</Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          borderTop: "1px solid #ccc",
          pt: 2,
          width: "90vw",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <List sx={{ display: "flex" }}>
              <ListItem>
                <IconButton>
                  <FaFacebookF color="white" />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton>
                  <FaTwitter color="white" />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton>
                  <FaGooglePlusG color="white" />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton>
                  <FaPinterestP color="white" />
                </IconButton>
              </ListItem>
              <ListItem>
                <IconButton>
                  <FaRss color="white" />
                </IconButton>
              </ListItem>
            </List>
          </Grid>
          <Grid item>
            <img src="/src/assets/images/payment-img_298x.png" alt="payment" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
