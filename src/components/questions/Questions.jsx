import React from "react";
import Confetti from "react-confetti";

const Questions = ({
  answers,
  revealedAnswers,
  correctAnswer,
  lockedAnswer,
  selectedAnswer,
  questions,
}) => {
  const answerbButtonElement = //answerbutton
    answers ? (
      answers.map((answer, index) => {
        let answerStyle = {};
        if (revealedAnswers) {
          // if quiz submitted
          if (answer === correctAnswer) {
            answerStyle = {
              backgroundColor: "#94D7A2",
              border: "none",
            };
          } else if (answer === lockedAnswer) {
            answerStyle = {
              backgroundColor: "#ff9393",
              opacity: 0.5,
              border: "none",
            };
          }
        } else {
          answerStyle = {
            backgroundColor:
              answer === lockedAnswer ? "#a2aee9" : "transparent",
            color: `#171a2b`,
            borderRadius: `${0.8}rem`,
            borderColor: `#4d5b9e`,
            cursor: "pointer",
          };
        }
        return (
          <>
            <button
              key={index}
              style={answerStyle}
              onClick={() => selectedAnswer(answer)}
            >
              {answers[index]}
            </button>
          </>
        );
      })
    ) : (
      <h2>Loading...</h2>
    );

  return (
    <div className="question">
      <h2>{questions}</h2>
      {answerbButtonElement}
      <hr />
    </div>
  );
};

export default Questions;
