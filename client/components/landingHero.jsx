import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingHero = ({
  onGetFood = () => {},
  onProvideFood = () => {},
}) => {
  const navigate = useNavigate();

  const handleGetFoodClick = () => {
    navigate("/finder");
  };

  const handleProvideFoodClick = () => {
    navigate("/login")
  };

  const MockPathSelector = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={handleGetFoodClick}
        className="px-8 py-4 text-xl font-semibold rounded-lg bg-[#FF9F1C] text-white hover:bg-[#f39518] transition-colors"
      >
        Get Food
      </button>
      <button
        onClick={handleProvideFoodClick}
        className="px-8 py-4 text-xl font-semibold rounded-lg bg-[#2EC4B6] text-white hover:bg-[#2ab3a6] transition-colors"
      >
        Provide Food
      </button>
    </div>
  );

  return (
    <div className="min-h-[600px] w-full bg-white flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1200px] w-full text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
          Share Food, Share Hope
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Connect with your community through food sharing - whether you need
          assistance or want to help others.
        </p>

        <div className="space-y-8">
          <MockPathSelector />
        </div>
      </motion.div>
    </div>
  );
};

export default LandingHero;