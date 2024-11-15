import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "./NavBar.css";
import { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../../context/CartContext";
import { ThemeContext } from "../../context/ThemeContext";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Cart", path: "/cart" },
    { text: "Receipts", path: "/receipts" },
  ];

  const themeContext = useContext(ThemeContext);
  const { theme, toggleTheme } = themeContext || {};
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { getTotalItems } = cartContext || {};
  const totalQuantity: number = getTotalItems ? getTotalItems() : 0;

  return (
    <Box className="navBarBody">
      <Box
        className="navbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Button color="secondary" onClick={toggleDrawer(true)}>
            Menu
          </Button>
          <Box className="navbar-logo" onClick={() => navigate("/")}>
            TurbulentForce
          </Box>
        </Box>
        <Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            component="button"
            variant="body2"
            color="secondary"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <ShoppingCartIcon /> {totalQuantity}
          </Link>
          <Button
            color="secondary"
            className="nav-button"
            onClick={toggleTheme}
          >
            {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </Button>
        </Box>
      </Box>

      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: theme === "dark" ? "#333333" : "#FBFBFB",
            color: theme === "dark" ? "#FFFFFF" : "#000000",
            height: "100%",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <RouterLink
                    to={item.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemText primary={item.text} />
                  </RouterLink>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
export default Navbar;
