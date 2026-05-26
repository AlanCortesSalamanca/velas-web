import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

const STORAGE_KEY = "velas-cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.find((item) => item.productId === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.productId === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...state,
        { productId: action.product.id, product: action.product, quantity: 1 },
      ];
    }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.productId !== action.productId);

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return state.filter((item) => item.productId !== action.productId);
      }
      return state.map((item) =>
        item.productId === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
    }

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback(
    (product) => {
      dispatch({ type: "ADD_TO_CART", product });
      const existing = items.find((i) => i.productId === product.id);
      if (existing) {
        toast.success(`Adjusted "${product.name}" quantity for quote`);
      } else {
        toast.success(`Added "${product.name}" to your selection`);
      }
    },
    [items]
  );

  const removeFromCart = useCallback((productId, productName) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
    toast.success(`Removed "${productName}" from your selection`);
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Selection cleared");
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
