import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import AddPlayer from "./routes/AddPlayer";
import ShowPlayer from "./routes/ShowPlayer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/add-player" element={<AddPlayer />} />
        <Route path="/show-player" element={<ShowPlayer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
