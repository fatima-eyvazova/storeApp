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
} from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

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
              <Typography
                variant="h6"
                sx={{
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: "bold",
                  letterSpacing: "0.2px",
                  lineHeight: "22px",
                  textTransform: "uppercase",
                }}
              >
                {t("title")}
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
              {t("copyright")} © 2023
            </Typography>
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: "bold",
                letterSpacing: "0.2px",
                lineHeight: "22px",
                textTransform: "uppercase",
              }}
            >
              {t("allRightsReserved")}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6">{t("information")}</Typography>
            <List>
              <ListItem>{t("specials")}</ListItem>
              <ListItem>{t("newProducts")}</ListItem>
              <ListItem>{t("topSellers")}</ListItem>
              <ListItem>{t("ourStores")}</ListItem>
              <ListItem>{t("contactUs")}</ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6">{t("myAccount")}</Typography>
            <List>
              <ListItem>{t("myOrders")}</ListItem>
              <ListItem>{t("myCreditSlips")}</ListItem>
              <ListItem>{t("myAddresses")}</ListItem>
              <ListItem>{t("myPersonalInfo")}</ListItem>
              <ListItem>{t("myWishlist")}</ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6">{t("quickLinks")}</Typography>
            <List>
              <ListItem>{t("newUser")}</ListItem>
              <ListItem>{t("helpCenter")}</ListItem>
              <ListItem>{t("refundPolicy")}</ListItem>
              <ListItem>{t("reportSpam")}</ListItem>
              <ListItem>{t("faqs")}</ListItem>
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
              {t("contactUs")}
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <IoHomeOutline />
                </ListItemIcon>
                <Typography>{t("storeAddress")}</Typography>
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
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
