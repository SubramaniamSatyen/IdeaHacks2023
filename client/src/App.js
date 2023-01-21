import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { db } from "./firebase";
import { onValue, ref } from "firebase/database";



function App() {
  const [scores, setScores] = useState([{_id: 1, value: 10}]);
  const [temp, setTemp] = useState([]);


  useEffect(() => {
    const query = ref(db, "/");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      console.log(data)
      if (snapshot.exists()) {
        setScores(Object.entries(data)) 
      }
    });
  }, []);

  console.log(temp)
  return (
    <div className="App">
      <h1>Highscores: </h1>

      <div className="scores">
        {scores.length > 0 ? scores.map(([id, value]) => (
          <div className="score" key={id}>
            <div className="text">{id}: {value}</div>
          </div>
        )) : (
          <p>There are currently no scores</p>
        )}
      </div>
    </div>
  );
}

export default App;
