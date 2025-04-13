import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Left Column - Text */}
      <div className="text-container">
        <h1 className="text-4xl font-bold text-[#800000] mb-4">Your Smile, Our Priority</h1>
        <p className="text-xl font-semibold text-gray-700 mb-8">Modern Dental Care Solutions at Your Fingertips</p>
        <button
          className="mt-15 px-6 py-3 bg-[#800000] text-white rounded-lg shadow-lg hover:bg-[#990000] hover:shadow-xl border-2 border-[#600000] font-semibold transform hover:scale-105 transition-all duration-200"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>

      {/* Right Column - Image */}
      <div className="image-container">
        <img src="/landingbg.png" alt="Dental Care" />
      </div>
    </div>
  );
};

export default Landing;
