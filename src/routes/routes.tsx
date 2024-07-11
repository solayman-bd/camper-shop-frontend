import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductManagemetPage from "../pages/ProductManagemetPage";
import CartPage from "../pages/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductPage />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetailsPage />,
  },
  {
    path: "/product-management",
    element: <ProductManagemetPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
]);

export default router;
