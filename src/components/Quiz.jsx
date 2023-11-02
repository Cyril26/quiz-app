import { useState } from "react";
import { resultInitialState } from "../constants";
import Result from "./Result";
import Loader from "./Loader";

const Quiz = ({ questions, loading }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0); //set to first question
  const [answer, setAnswer] = useState(null); //actual answer
  const [answerIndex, setAnswerIndex] = useState(null); //answer index
  const [result, setResult] = useState(resultInitialState); //
  const [showResult, setShowResult] = useState(false); //used to denote end of quiz
  const [report, setReport] = useState([]); //used to store final report of test

  const answers = ["True", "False"];

  // wait for questions to load else component will render before questions is returned from api
  if (loading) {
    return <Loader />;
  } else {
    // used var to make variables available globally
    var { question, correct_answer, category } = questions[currentQuestion];
  }

  const handleSelectAnswer = (answer, i) => {
    //set the index of number
    setAnswerIndex(i);

    // conversion because the correct_answer is a capitalized string from api
    // before comparison: true === 'True'
    const stringAnswer = answer ? "True" : "False";
    const isCorrectAnswer =
      stringAnswer.toLowerCase() === correct_answer.toLowerCase();
    setAnswer(isCorrectAnswer);
  };

  const onNext = () => {
    const answerObject = {
      question,
      correct_answer,
      answer,
    };

    setReport((prev) => [...prev, answerObject]);

    setAnswerIndex(null); //resets the answer index to disable the next button
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    //if not last question
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      //reset and navigate to results screen
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  //sets app state to initial values
  const onTryAgain = () => {
    setResult(resultInitialState);
    setReport([]);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <span className="current">{category}</span>
          <h2>{question}</h2>
          <ul className="ul-answer">
            {answers.map((answer, i) => (
              <li
                key={answer}
                onClick={() => handleSelectAnswer(answer, i)}
                className={answerIndex === i ? "selected" : null}
              >
                {answer}
              </li>
            ))}
          </ul>
          <span className="current">
            {currentQuestion + 1}/{questions.length}
          </span>
          <div className="footer">
            <button
              onClick={onNext}
              disabled={answerIndex === null}
              className="btn-con"
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <Result
          result={result}
          totalQuestions={questions.length}
          onTryAgain={onTryAgain}
          report={report}
        />
      )}
    </div>
  );
};

export default Quiz;
