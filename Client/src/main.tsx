import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import { ProductProvider } from "./ContextAPI/ProductContext.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Collection from "./pages/Collection/Collection.tsx";
import ProductDisplay from "./components/ProductDisplay/ProductDisplay.tsx";
import CartPage from "./pages/Cart/CartPage.tsx";
import { ModalProvider } from "./ContextAPI/ModalContext.tsx";
import UploadProduct from "./Admin/Add.tsx";
import Add from "./Admin/Add.tsx";
import List from "./Admin/List.tsx";
import Order from "./Admin/Order.tsx";
import AdminHome from "./Admin/AdminHome.tsx";
import EsewaPayment from "./Esewa/Esewapayment.tsx";
import KhaltiPayment from "./Esewa/Khalit.tsx";
import PaymentSuccess from "./Esewa/PaymentSuccess.tsx";
const allroutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/collection",
    element: <Collection />,
  },
  {
    path: "/product/:id",
    element: <ProductDisplay />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/adminhome",
    element: <AdminHome />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/list",
    element: <List />,
  },
  {
    path: "/orders",
    element: <Order />,
  },
  //payment
  {
    path: "/payment",
    element: <EsewaPayment />,
  },
  {
    path: "/khalti",
    element: <KhaltiPayment />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <ModalProvider>
    <ProductProvider>
      <StrictMode>
        <RouterProvider router={allroutes} />
      </StrictMode>
      ,
    </ProductProvider>
  </ModalProvider>
);
