import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [scores, setScores] = useState([{_id: 1, value: 10}]);

  return (
    <div className="App">
      <h1>Highscores: </h1>

      <div className="scores">
        {scores.length > 0 ? scores.map(score => (
          <div className={
            "score" + (score.complete ? " is-complete" : "")
          } key={score._id}>
            <div className="text">{score.value}</div>
          </div>
        )) : (
          <p>There are currently no scores</p>
        )}
      </div>
    </div>
  );
}

export default App;
