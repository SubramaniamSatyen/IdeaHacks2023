import './App.css';
import { useEffect, useState } from 'react';
import { db } from "./firebase";
import { onValue, ref } from "firebase/database";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const total_strength_bars = 12

function Reader() {
  const [strengthReading, setStrength] = useState(<div className="progressBox"/>);
  const [score, setScore] = useState(1);
  const [emptyReading, setEmpty] = useState(new Array(total_strength_bars - score).fill('').map((_, index) => <div className="emptyBox"/>));


  useEffect(() => {
    const query = ref(db, "/");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        setScore(data._device_reading)
        console.log(data._device_reading) 
        setStrength(new Array(data._device_reading).fill('').map((_, index) => <div className="progressBox"/>))
        setEmpty(new Array(total_strength_bars - data._device_reading).fill('').map((_, index) => <div className="emptyBox"/>))
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="header">
        <Button variant="contained" component={Link} to="/scores">Highscores</Button>
      </div>
      <div className="columnWrapper">
        <div className="column">
          <h2>Muscle Reading</h2>
            <div className="fillSpace">
              {emptyReading}
              {strengthReading}
            </div>
          </div>
        <div className="column">
          <h2># of Repetitions</h2>
        </div>
        <div className="column">
          <h2>Completed Sets</h2>
        </div>
      </div>
    </div>
  );
}

export default Reader;
