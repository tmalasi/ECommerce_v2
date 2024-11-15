import { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { CartContext } from "../../context/CartContext";
import { ThemeContext } from "../../context/ThemeContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const Navbar: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const { theme, toggleTheme } = themeContext || {};
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { getTotalItems } = cartContext || {};
  const totalQuantity: number = getTotalItems ? getTotalItems() : 0;

  return (
    <Box>
      <Box className="navbar">
        <Box className="navbar-logo" onClick={() => navigate("/")}>
          TurbulentForce
        </Box>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Link>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <ShoppingCartIcon /> {totalQuantity}
        </Link>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/receipts");
          }}
        >
          Receipts
        </Link>
        <Button className="nav-button" onClick={toggleTheme}>
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
// 275 50
