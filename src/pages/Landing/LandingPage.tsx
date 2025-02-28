import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Left Column - Text */}
      <div className="text-container">
        <h1>Dental Admission and Chart Filling System</h1>
        <p>Empowering Patients & Simplifying Dental Care</p>
        <button
          className="mt-15 px-6 py-3 bg-[#800000] text-white rounded-lg shadow-md hover:bg-[#990000] transition cursor-pointer"
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
