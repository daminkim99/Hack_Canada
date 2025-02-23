import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../src/styles/Landing.css";

const LandingHero = ({ onGetFood = () => {}, onProvideFood = () => {} }) => {
  const navigate = useNavigate();

  const handleGetFoodClick = () => {
    navigate("/finder");
  };

  const handleProvideFoodClick = () => {
    navigate("/login");
  };

  const MockPathSelector = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center head">
      <button onClick={handleGetFoodClick} className="btn">
        Get Food
      </button>
      <button onClick={handleProvideFoodClick} className="btn">
        Provide Food
      </button>
    </div>
  );

  return (
    <div className="min-h-[600px] w-full bg-white flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1200px] w-full text-center"
      >
        <Header />
        <Navigation />
        <div className=" head">
          <h1>Share Food, Share Hope</h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Connect with your community through food sharing - whether you need
            assistance or want to help others.
          </p>
        </div>
        <div className="space-y-8">
          <MockPathSelector />
        </div>
        <Footer />
      </motion.div>
    </div>
  );
};

export default LandingHero;
