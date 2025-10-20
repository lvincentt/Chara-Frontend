import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/AxiosInterceptor";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  // Fetch cart items ketika user login
  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await api.get("cart/");
      setCartItems(response.data);
    } catch (error) {
      console.error("Gagal mengambil data cart", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post("cart/", {
        product_id: productId,
        quantity: quantity,
      });
      // Refresh cart setelah menambah item
      await fetchCartItems();
      return true;
    } catch (error) {
      console.error("Gagal menambahkan ke keranjang", error);
      return false;
    }
  };

  const updateCartItem = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    // Update UI lokal dulu untuk responsiveness
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      await api.patch(`cart/${itemId}/`, { quantity: newQuantity });
    } catch (error) {
      console.error("Gagal update quantity", error);
      // Revert jika gagal
      await fetchCartItems();
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`cart/${itemId}/`);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      return true;
    } catch (error) {
      console.error("Gagal hapus item:", error);
      return false;
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discounted_price || item.product.price;
      return total + parseFloat(price) * item.quantity;
    }, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    isLoading,
    fetchCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
