import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import EditPage from "../pages/EditPage";
import Layout from "../Layout/Layout";
import ListPage from "../pages/ListPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/list",
                element: <ListPage />,
            },
            {
                path: "/edit/:id",
                element: <EditPage />,
            },
        ]
    }
]);
