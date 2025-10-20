import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import OrderDetail from "./pages/OrderDetail";
import Navbar from "./components/Navbar";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProductList />} />
              <Route path="/:id" element={<ProductDetail />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<OrderDetail />} />
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
