import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import UpdateUser from "./pages/UpdateUser";

function App() {
    return (
        <div className="container">
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/update-user" element={<UpdateUser />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
