import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = "₹";
  const delivery_fee = 49;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  /* ================= TOKEN ================= */

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  /* ================= CART ================= */

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  /* ================= SAVE CART ================= */

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /* ================= SAVE TOKEN ================= */

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  /* ================= ADD TO CART ================= */

  const addToCart = async (itemId, size) => {

    if (!size) {
      toast.error("Please select a size");
      return;
    }

    setCartItems((prev) => {
      const cartData = { ...prev };

      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }

      cartData[itemId][size] =
        (cartData[itemId][size] || 0) + 1;

      return cartData;
    });

    if (token) {
      try {

        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Cart error");
      }
    }
  };

  /* ================= UPDATE QUANTITY ================= */

  const updateCartQuantity = async (id, size, quantity) => {

    if (quantity < 1) {
      removeFromCart(id, size);
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [size]: quantity,
      },
    }));

    if (token) {
      try {

        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId: id, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Update failed");
      }
    }
  };

  /* ================= REMOVE FROM CART ================= */

  const removeFromCart = async (id, size) => {

    setCartItems((prev) => {
      const cartData = { ...prev };

      if (!cartData[id]) return prev;

      delete cartData[id][size];

      if (Object.keys(cartData[id]).length === 0) {
        delete cartData[id];
      }

      return cartData;
    });

    if (token) {
      try {

        await axios.post(
          backendUrl + "/api/cart/remove",
          { itemId: id, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } catch (error) {
        console.log(error);
      }
    }
  };

  /* ================= FETCH PRODUCTS ================= */

  const getProductData = async () => {
    try {

      const response = await axios.get(
        backendUrl + "/api/product/list"
      );

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  /* ================= GET USER CART ================= */

  const getUserCart = async (currentToken) => {

    try {

      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }

    } catch (error) {
      console.log(error);
    }
  };

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {

    const savedToken = localStorage.getItem("token");

    if (!token && savedToken) {

      setToken(savedToken);
      getUserCart(savedToken);
    }

    if (token) {
      getUserCart(token);
    }

  }, [token]);

  /* ================= CONTEXT VALUE ================= */

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
