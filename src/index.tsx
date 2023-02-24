import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import AddPlayer from "./routes/AddPlayer";
import AddWaistHip from "./routes/AddWaistHip";
import AddVo2 from "./routes/AddVo2";
import ShowPlayer from "./routes/ShowPlayer";
import AddMET from "./routes/AddMET";
import UpdatePlayer from "./routes/UpdatePlayer";
import AddGenetics from "./routes/AddGenetics";
import AddKeyMeasurement from "./routes/AddKeyMeasurement";

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
        <Route path="/update-player" element={<UpdatePlayer />} />
        <Route path="/add-waist-hip" element={<AddWaistHip />} />
        <Route path="/show-player" element={<ShowPlayer />} />
        <Route path="/add-vo2" element={<AddVo2 />} />
        <Route path="/add-met" element={<AddMET />} />
        <Route path="/add-genetics" element={<AddGenetics />} />
        <Route path="/add-key-measurements" element={<AddKeyMeasurement />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
