import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ErrorPage from "./route/ErrorPage.jsx";
import ProductPage from "./route/ProductPage.jsx";
import ContextsProvider from "./context/ContextsProvider.jsx";
import SettingPage from "./route/SettingPage.jsx";
import HomePage from "./route/HomePage.jsx";
import ProductForm from "./component/product/ProductForm.jsx";
import productService from "./service/productService.js";
import StockPage from "./route/StockPage.jsx";
import StockForm from "./component/stock/StockForm.jsx";
import StockDisplay from "./component/stock/StockDisplay.jsx";
import POSPage from "./route/POSPage.jsx";
import ReportPage from "./route/ReportPage.jsx";
import ProductDisplay2 from "./component/product/ProductDisplay2.jsx";
import recordService from "./service/recordService.js";
import SalesReport from "./component/report/SalesReport.jsx";
import "@fontsource/oswald";

const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <HomePage /> },
            {
                path: "product",
                element: <ProductPage />,
                children: [
                    {
                        path: "",
                        element: <ProductDisplay2 />,
                    },
                    {
                        path: "create",
                        element: <ProductForm />,
                    },
                    {
                        path: ":productId",
                        element: <ProductForm />,
                        loader: async ({ params }) => {
                            return productService.getSingleProduct(
                                params.productId,
                            );
                        },
                    },
                ],
            },
            {
                path: "stock",
                element: <StockPage />,
                children: [
                    {
                        path: "",
                        element: <StockDisplay />,
                    },
                    {
                        path: "create",
                        element: <StockForm />,
                    },
                    {
                        path: ":recordId",
                        element: <StockForm />,
                        loader: async ({ params }) => {
                            return recordService.getSingleRecord(
                                params.recordId,
                            );
                        },
                    },
                ],
            },
            { path: "pos", element: <POSPage /> },
            {
                path: "report",
                element: <ReportPage />,
                children: [
                    {
                        path: "",
                        element: <SalesReport />,
                    },
                ],
            },
            {
                path: "setting",
                element: <SettingPage />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ContextsProvider>
            <RouterProvider router={router} />
        </ContextsProvider>
    </StrictMode>,
);
