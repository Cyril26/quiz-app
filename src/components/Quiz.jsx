import { useState } from "react";
import { answers, resultInitialState } from "../constants";
import Result from "./Result";
import Loader from "./Loader";

const Quiz = ({ questions, loading }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0); //set to first question
  const [answer, setAnswer] = useState(null); //actual answer
  const [answerIndex, setAnswerIndex] = useState(null); //answer index
  const [result, setResult] = useState(resultInitialState); //
  const [showResult, setShowResult] = useState(false); //used to denote end of quiz
  const [report, setReport] = useState([]); //used to store final report of test

  // wait for questions to load else component will render before questions is returned from api
  if (loading) {
    return <Loader />;
  } else {
    // used var to make variables available globally
    var { question, correct_answer, category } = questions[currentQuestion];
  }

  const handleSelectAnswer = (answer, i) => {
    //set the index of answer
    //helps compare the user's choice with the correct answer
    setAnswerIndex(i);

    // conversion because the correct_answer is a capitalized string from api
    // before comparison: true === 'True'
    // stored as string so we can compare with correct_answer from api which is also a string
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

    //saves a report of questions and answers we selected so far
    setReport((prev) => [...prev, answerObject]);

    setAnswerIndex(null); //resets the answer index to disable the next button
    //updates the current question number and score
    //keeps track of number of corrects and wrongs
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

    //if not last question, move to next, else render result and restart
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
      setCurrentQuestion(0);
    }
  };

  //sets app state to initial values
  const onTryAgain = () => {
    setResult(resultInitialState);
    setReport([]);
    setShowResult(false);
  };

  // allows you to parse HTML or XML text into a DOM structure
  const parser = new DOMParser();
  //method to parse the question string as HTML and obtain a DOM representation
  const decodedQuestion = parser.parseFromString(question, "text/html").body
    .textContent;

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <span className="current">{category}</span>
          {/* dangerouslySetInnerHTML:  insert HTML content as itshould be  */}
          <h2 dangerouslySetInnerHTML={{ __html: decodedQuestion }}></h2>
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
            {/* count from one */}
            {currentQuestion + 1}/{questions.length}
          </span>
          <div className="footer">
            <button
              onClick={onNext}
              disabled={answerIndex === null} //makes sure user selects an answer before moving to next question
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
