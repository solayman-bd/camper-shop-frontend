import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IProduct } from "../../../components/ProductCard";

interface CartItem extends IProduct {
  cartQuantity: number;
}

interface CartState {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

// Function to calculate totals from cart items
const calculateTotals = (cartItems: CartItem[]) => {
  const { total, quantity } = cartItems.reduce(
    (cartTotal, cartItem) => {
      const itemTotal = cartItem.price * cartItem.cartQuantity;
      cartTotal.total += itemTotal;
      cartTotal.quantity += cartItem.cartQuantity;
      return cartTotal;
    },
    {
      total: 0,
      quantity: 0,
    }
  );
  return {
    totalAmount: parseFloat(total.toFixed(2)),
    totalQuantity: quantity,
  };
};

// Initialize cart state with items from localStorage
const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  cartTotalQuantity:
    JSON.parse(localStorage.getItem("cartItems") || "[]").length > 0
      ? calculateTotals(JSON.parse(localStorage.getItem("cartItems") || "[]"))
          .totalQuantity
      : 0,
  cartTotalAmount:
    JSON.parse(localStorage.getItem("cartItems") || "[]").length > 0
      ? calculateTotals(JSON.parse(localStorage.getItem("cartItems") || "[]"))
          .totalAmount
      : 0,
};

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        const tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      const { totalAmount, totalQuantity } = calculateTotals(state.cartItems);
      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQuantity;
    },
    decreaseCart(state, action: PayloadAction<IProduct>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      const { totalAmount, totalQuantity } = calculateTotals(state.cartItems);
      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQuantity;
    },
    removeFromCart(state, action: PayloadAction<IProduct>) {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );

      toast.error("Product removed from cart", {
        position: "bottom-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      const { totalAmount, totalQuantity } = calculateTotals(state.cartItems);
      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQuantity;
    },
    getTotals(state) {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const itemTotal = cartItem.price * cartItem.cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartItem.cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2));
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
