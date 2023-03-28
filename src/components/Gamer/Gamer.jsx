import { useState, useEffect } from "react";
import { decode } from "html-entities";
import Questions from "../questions/Questions";
import uuid from "react-uuid";
import Loader from "../loader/Loader";
import Confetti from "react-confetti";

const Gamer = () => {
  const [quizDataStore, setQuizDataStore] = useState([]);
  const [shuffleAnswer, setShuffleAnswer] = useState([]);
  const [quizSubmitted, setquizSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [lockedAnswers, setLockedAnswers] = useState(["", "", "", "", ""]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const updateDimension = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimension);
    return () => window.removeEventListener("resize", updateDimension);
  }, []);

  // fetch new questions
  useEffect(() => {
    if (!quizSubmitted) {
      // means user is playing a new quiz
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((res) => res.json())
        .then((questionsData) => {
          const decodedQuestionsData = questionsData.results.map((question) => {
            return {
              ...question,
              question: decode(question.question),
              correct_answer: decode(question.correct_answer),
              incorrect_answers: question.incorrect_answers.map((answer) =>
                decode(answer)
              ),
            };
          });
          setQuizDataStore(decodedQuestionsData);
        });
    }
  }, [quizSubmitted]);

  useEffect(() => {
    // shuffle answer each time question is chna
    const newArray = [];
    quizDataStore.forEach((answer) => {
      newArray.push(
        [answer.correct_answer, ...answer.incorrect_answers].sort(
          () => Math.random() - 0.5
        )
      );
    });
    setShuffleAnswer(newArray);
  }, [quizDataStore]);

  const questionElement = quizDataStore.map((quizData, index) => (
    <Questions
      key={uuid()}
      questions={quizData.question}
      correctAnswer={quizData.correct_answer}
      answers={shuffleAnswer[index]}
      selectedAnswer={(answer) => lock_answer(answer, index)}
      lockedAnswer={lockedAnswers[index]}
      revealedAnswers={quizSubmitted}
    />
  ));

  const lock_answer = (newAnswer, index) => {
    if (!quizSubmitted)
      setLockedAnswers((oldAnswer) =>
        oldAnswer.map((answer, ind) => {
          return ind === index ? newAnswer : answer;
        })
      );
  };

  const checkAnswers = () => {
    if (quizSubmitted) {
      // generate new quiz
      setquizSubmitted(false);
      setLockedAnswers(["", "", "", "", ""]);
      setCorrectAnswer(0);
    } else {
      // check answer
      // check if any answer have not been answered

      if (lockedAnswers.some((answer) => answer === "")) {
        alert("all answers must be selected!");
        return;
      }
      let count = 0;

      quizDataStore.forEach((selected, index) => {
        if (selected.correct_answer === lockedAnswers[index]) {
          count++;
        }
        setCorrectAnswer(count);
        setquizSubmitted(true);
      });
    }
  };

  const questionLength = quizDataStore.map((quest) => quest);
  const length = questionLength.length;

  return length === 0 ? (
    <Loader />
  ) : (
    <div className="game started">
      {correctAnswer === length && <Confetti width={width} height={height} />}
      <div className="game-main">
        {questionElement}
        <div className="button-section">
          {quizSubmitted && (
            <h2>
              You scored {correctAnswer} / {length} correct answer
            </h2>
          )}
          <button className="game-button" onClick={checkAnswers}>
            {quizSubmitted ? "play again" : "check answers"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gamer;
