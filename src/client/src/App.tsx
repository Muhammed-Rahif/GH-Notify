import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import UpdateAccessToken from "./pages/UpdateAccessToken";

function App() {
  return (
    <div className="container">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-access-token" element={<UpdateAccessToken />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
