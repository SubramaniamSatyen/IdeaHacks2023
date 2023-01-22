import './App.css';
import { useEffect, useState } from 'react';
import { db } from "./firebase";
import { onValue, ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useAuth } from './Auth';

const device_reserved = ["_device_reading", "_device_user", "_device_hr", "_device_hr_reading"]

function Highscores() {
  const [scores, setScores] = useState([{_id: 1, value: 10}]);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();



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

  const logout = () => {
    set(ref(db, '/_device_user'), "_no_user")
    setUser("_no_user")
    navigate("/scores");
  }

  return (
    <div className="App">
      <div className="header">
      <div className="buttonWrapper">
          {user == "_no_user" ?
          <Button variant="contained" component={Link} to="/signin">Sign In</Button>
          :
          <Button variant="contained" onClick={logout}>Log Out</Button>
          }
        </div>
        <div className="buttonWrapper">{user == "_no_user" ? "" : <Button variant="contained" component={Link} to="/reader">Dashboard</Button>}</div>
      </div>
      <h1>Leaderboard: </h1>


      <div className="scores">
        {scores.length > 0 ? scores.filter((score_record) => (score_record.length >= 2 && !device_reserved.includes(score_record[0])))
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
