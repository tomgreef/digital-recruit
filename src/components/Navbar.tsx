import { Box, Button, Container, Drawer, Grid, IconButton, ImageList, ImageListItem, List, ListItem, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { navigate } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { TFunction } from "i18next";
import React, { FC, useState } from "react";
import { StyledNavbarLink, theme } from "../theme";
import { Route } from "./Footer";
import LanguageSelector from "./LanguageSelector";
import logo from "../../assets/images/logo.svg";

console.log(logo);

const WEBSITE_ROUTES: Route[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
];

const Navbar: FC = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery(useTheme().breakpoints.up("md"));

  return (
    <Box sx={{ backgroundColor: theme.palette.secondary.main }}>
      <Container component="nav" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: isDesktop ? theme.spacing(3) : theme.spacing(1) }}>
        {isDesktop ? (
          <>
            <ImageList sx={{ width: 140, height: 50 }} cols={1}>
              <ImageListItem onClick={() => navigate("/")}>
                <img src={logo} width="40px" />
              </ImageListItem>
            </ImageList>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {WEBSITE_ROUTES.map((route) => (
                <StyledNavbarLink to={route.to} key={route.label}>
                  {t(route.label)}
                </StyledNavbarLink>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button variant="contained" onClick={() => navigate("/contact")}>
                {t("Contact")}
              </Button>
              <Button variant="contained">{t("Job Board")}</Button>
              <LanguageSelector />
            </Box>
          </>
        ) : (
          <MobileDrawer t={t} />
        )}
      </Container>
    </Box>
  );
};

export default Navbar;

interface MobileDrawerProps {
  t: TFunction<"translation", undefined>;
}

const MobileDrawer: FC<MobileDrawerProps> = ({ t }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{ color: theme.palette.background.paper }} />
      </IconButton>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Grid container flexDirection="column" justifyContent="space-between" sx={{ height: "100vh" }}>
          <Grid item sx={{ width: "60vw", cursor: "pointer" }}>
            <List component="nav">
              {WEBSITE_ROUTES.map((route) => (
                <ListItem
                  key={route.label}
                  onClick={() => {
                    setOpenDrawer(false);
                    navigate(route.to);
                  }}
                >
                  <ListItemText primary={t(route.label)} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: theme.spacing(2),
            }}
          >
            <LanguageSelector />
            <Button variant="contained" onClick={() => navigate("/contact")} fullWidth>
              {t("Contact")}
            </Button>
            <Button variant="contained" fullWidth>
              {t("Job Board")}
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};
