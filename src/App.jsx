import { useState } from "react";
import LandingPage from "./components/landingPage/LandingPage";
import "./App.css";
import Loader from "./components/loader/Loader";
import Gamer from "./components/Gamer/Gamer";
function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const startQuiz = () => {
    setIsQuizStarted((prev) => !prev);
  };

  return (
    <div className="loader app">
      {!isQuizStarted && <LandingPage startQuiz={startQuiz} />}
      {isQuizStarted && <Gamer />}
      {/* <Loader /> */}
    </div>
  );
}

export default App;
