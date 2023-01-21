import './App.css';
import { useEffect, useState } from 'react';
import { db } from "./firebase";
import { onValue, ref } from "firebase/database";



function Highscores() {
  const [scores, setScores] = useState([{_id: 1, value: 10}]);
  const [temp, setTemp] = useState([]);


  useEffect(() => {
    const query = ref(db, "/");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        setScores(Object.entries(data)) 
        console.log(Object.entries(data))
      }
    });
  }, []);

  console.log(temp)
  return (
    <div className="App">
      <h1>Highscores: </h1>

      <div className="scores">
        {scores.length > 0 ? scores.map((score_record) => (
          (score_record.length >= 2 ?
          <div className="score" key={score_record[0]}>
            <div className="text">{score_record[0]}: {score_record[1]}</div>
          </div>
          : 
          "")
        )) : (
          <p>There are currently no scores</p>
        )}
      </div>
    </div>
  );
}

export default Highscores;
