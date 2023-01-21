import './App.css';
import { useEffect, useState } from 'react';
import { db } from "./firebase";
import { onValue, ref } from "firebase/database";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const device_reserved = "_device_reading"

function Highscores() {
  const [scores, setScores] = useState([{_id: 1, value: 10}]);

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

  return (
    <div className="App">
      <div className="header">
        <Button variant="contained" component={Link} to="/reader">Muscle Readings</Button>
      </div>
      <h1>Highscores: </h1>


      <div className="scores">
        {scores.length > 0 ? scores.filter((score_record) => (score_record.length >= 2 && score_record[0] != device_reserved))
          .sort((sc1, sc2) => {
            return sc2[1] - sc1[1];
          })
          .map((score_record) => 
          <div className="score" key={score_record[0]}>
            <div className="text">{score_record[0]}: {score_record[1]}</div>
          </div>
        ) : (
          <p>There are currently no scores</p>
        )}
      </div>
    </div>
  );
}

export default Highscores;
