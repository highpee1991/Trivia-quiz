import React from "react";
import "./landingpage.css";

const LandingPage = ({ startQuiz }) => {
  return (
    <div className="lading-page">
      <div className="landing-page-wrapper">
        <h1 className="header">Quiza</h1>
        <div className="sub-header">Test Your Self With This Awesome Quiz</div>
        <div className="btn">
          <button onClick={startQuiz} className="start-button">
            Start Quizz
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
