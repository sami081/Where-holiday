import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";

const index= () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/trending" element={<Trending />} />
        {/* PERMET D ALLER A L ACCUEIL SI L URL EST MAL TAPER */}
        <Route path="*" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
};
export default index;