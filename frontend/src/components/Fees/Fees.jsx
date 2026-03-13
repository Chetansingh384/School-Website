import React from "react";
import "./Fees.css";
import FeeDetails from "../../assets/FeeDetails.png"; // Adjust the path as per your project structure

const Fees = () => {
  return (
    <div className="Fees" id="fees">
      {/* <h2>Fee Details (2024–25 and 2025–26)</h2> */}
      <div className="fees-image-container">
        <img src={FeeDetails} alt="Fee Details" className="fees-image" />
      </div>
    </div>
  );
};

export default Fees;
