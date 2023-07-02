import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster/>
    </ThemeProvider>
  </React.StrictMode>
);
