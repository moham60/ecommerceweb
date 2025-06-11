import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../node_modules/flowbite/dist/flowbite.js";
import "./index.css";
import "flowbite";
import "aos/dist/aos.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
