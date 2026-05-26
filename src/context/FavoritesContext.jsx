import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "velas-favorites";

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function favoritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE": {
      const exists = state.includes(action.productId);
      if (exists) {
        return state.filter((id) => id !== action.productId);
      }
      return [...state, action.productId];
    }

    case "CLEAR_FAVORITES":
      return [];

    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [favoriteIds, dispatch] = useReducer(favoritesReducer, [], loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = useCallback((productId, productName) => {
    const isFav = favoriteIds.includes(productId);
    dispatch({ type: "TOGGLE_FAVORITE", productId });
    if (isFav) {
      toast.success(`Removed "${productName}" from favorites`);
    } else {
      toast.success(`Added "${productName}" to favorites`);
    }
  }, [favoriteIds]);

  const isFavorite = useCallback(
    (productId) => favoriteIds.includes(productId),
    [favoriteIds]
  );

  const totalFavorites = favoriteIds.length;

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
        totalFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
