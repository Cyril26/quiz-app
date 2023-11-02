import { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";

function App() {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    await fetch(
      "https://opentdb.com/api.php?amount=15&difficulty=hard&type=boolean"
    )
      .then((response) => response.json())
      .then((data) => setQuestions(data.results))
      .catch((error) => console.log(error.message));
  };

  //fetch questions on initial render
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Welcome />} />
        <Route path="/quiz" exact element={<Quiz questions={questions} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
