import "./App.css";
import Quiz from "./components/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import useTriviaQuestions from "./hooks/useTriviaQuestions";

function App() {
  const { questions, loading } = useTriviaQuestions(); //custom hook

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Welcome />} />
        <Route
          path="/quiz"
          exact
          element={<Quiz questions={questions} loading={loading} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
