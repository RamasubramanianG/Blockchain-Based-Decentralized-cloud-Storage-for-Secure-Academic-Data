import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

console.log("✅ React App is Loading..."); // Debug message

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
