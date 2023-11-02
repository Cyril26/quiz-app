import correctImage from "../assets/correct.png";
import wrongImage from "../assets/wrong.png";

const Result = ({ totalQuestions, result, onTryAgain, report }) => {
  return (
    <div className="report">
      <h3>You scored</h3>
      <h2>
        {result.score}/{totalQuestions}
      </h2>
      <ul className="report-list">
        {report &&
          report.map((cq, i) => (
            <li key={`report-${i}`} className="report-list">
              {cq.answer ? (
                <div className="report-item">
                  <img src={correctImage} alt="Correct" />
                  <p>
                    {cq.question}{" "}
                    <span className="correct-answer">{cq.correct_answer}</span>
                  </p>
                </div>
              ) : (
                <div className="report-item">
                  <img src={wrongImage} alt="Wrong" />
                  <p>
                    {cq.question}{" "}
                    <span className="correct-answer">{cq.correct_answer}</span>
                  </p>
                </div>
              )}
            </li>
          ))}
      </ul>

      <button onClick={onTryAgain} className="btn-con">
        Try again
      </button>
    </div>
  );
};

export default Result;
