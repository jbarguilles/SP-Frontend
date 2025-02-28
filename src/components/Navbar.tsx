import React from "react";
import upLogo from "../logos/up.png";
import upcdLogo from "../logos/upcd.png";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#800000] p-4 flex items-center justify-between h-28">
      {/* Left side: Logos and Text */}
      <div className="flex items-center space-x-3 ml-2">
        <img src={upLogo} alt="UP Logo" className="h-18 w-auto" />
        <img src={upcdLogo} alt="UPCD Logo" className="h-20 w-auto" />
        <div className="text-white">
          <h1 className="text-3xl font-bold">University of the Philippines Manila</h1>
          <h2 className="text-xl">College of Dentistry</h2>
        </div>
      </div>

      {/* Right side: Button */}
      <button className="text-white mr-5 px-4 py-2 rounded-lg text-lg font-semibold ml-auto hover:bg-[#600000] hover:text-white transition cursor-pointer">
        Log in
      </button>
    </nav>
  );
};

export default Navbar;
