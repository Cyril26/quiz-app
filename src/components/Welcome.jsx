import { Link } from "react-router-dom";
import "../index.scss";

const Welcome = () => {
  return (
    <div className="quiz-container">
      <h2>Welcome to this game</h2>
      <p>You will be presented with 15 true or false questions.</p>
      <p>Can you score 100%?</p>
      <div className="footer">
        <Link to="/quiz" className="btn-con">
          Begin
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
