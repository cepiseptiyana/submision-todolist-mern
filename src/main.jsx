import { StrictMode } from "react";
import "./index.css";

// routes
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import router from "@/routes/router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
