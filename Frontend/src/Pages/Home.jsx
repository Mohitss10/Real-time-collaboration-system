import React, { useState, useEffect } from "react";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import Footer from "../components/Home/Footer";
import Pricing from "../components/Home/Pricing";

const Home = () => {
  return (
    <div
      className="overflow-x-hidden"
      style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Home;
