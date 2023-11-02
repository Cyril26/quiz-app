import { useEffect, useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';

function App() {
  const [questions, setQuestions] = useState([])

  const getQuestions = async () => {
    await fetch('https://opentdb.com/api.php?amount=15&difficulty=hard&type=boolean')
      .then(response => response.json())
      .then(data => setQuestions(data.results))
      .catch(error => console.log(error.message))
  } 

  useEffect(() => {
    getQuestions()
  }, [])
    

  return (
      <Quiz questions={questions}/>
  );
}

export default App;
