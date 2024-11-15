import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/navbar/Navbar";
import Routes from "./routes/Routes";
import { ReceiptsProvider } from "./context/ReceiptsContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <CartProvider>
            <ReceiptsProvider>
              <Navbar />
              <Routes />
            </ReceiptsProvider>
          </CartProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
