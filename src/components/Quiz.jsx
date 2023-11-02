import { useState } from "react";

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answer, setAnswer] = useState(null)
    const [answerIndex, setAnswerIndex] = useState(null)


    const answers = ['True', 'False']
    
    if (questions.length === 0 || currentQuestion >= questions.length) {
        return <div>No questions available.</div>;
    } else {
        var { question, correct_answer } = questions[currentQuestion]
    }
    
    const handleClick = (answer, i) => {
        setAnswerIndex(i)
        answer === correct_answer ? setAnswer(true) : setAnswer(false)
    }

    const onNext = () => {

    }

    return (
      <div className="quiz-container">
        <>
            <span className="current">{question.category}</span>
            <h2>{question}</h2>
            <ul>
                {answers.map((answer, i) => (
                    <li key={answer} onClick={() => handleClick(answer, i)} className={answerIndex === i ? "selected" : null}>
                        {answer}
                    </li>
                ))}
            </ul>
            <span className="current">{currentQuestion + 1}</span>
            <span className="total">/{questions.length}</span>
            
            <div className="footer">
                <button onClick={onNext}  disabled={answerIndex === null}>
                    {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                </button>
            </div>
        </>
      </div>
    );
  };
  
  export default Quiz;

  
  