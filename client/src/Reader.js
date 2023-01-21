import './App.css';
import { useEffect, useState } from 'react';
import { db } from "./firebase";
import { onValue, ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useAuth } from './Auth';


const total_strength_bars = 12
const total_rep_bars = 6;

function Reader() {
  const [strengthReading, setStrength] = useState(<div className="progressBox"/>);
  const [emptyReading, setEmpty] = useState(new Array((total_strength_bars - 1) > 0 ? total_strength_bars - 1 : 0).fill('').map((_, index) => <div className="emptyBox"/>));

  const [score, setScore] = useState(0);
  const [repReading, setRep] = useState(<div className="repetitionBox"/>);
  const [emptyRep, setRepEmpty] = useState(new Array((total_rep_bars - 1) > 0 ? total_rep_bars - 1 : 0).fill('').map((_, index) => <div className="emptyRepBox"/>));
  const { user, setUser } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const query = ref(db, "/_device_reading");
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        setStrength(new Array(data > total_strength_bars ? total_strength_bars : data).fill('').map((_, index) => <div className="progressBox"/>))
        setEmpty(new Array((total_strength_bars - data > 0 ? total_strength_bars - data : 0)).fill('').map((_, index) => <div className="emptyBox"/>))
      }
    });

    const query2= ref(db, "/"+user);
    onValue(query2, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        setScore(data)
        setRep(new Array(total_rep_bars - data % total_rep_bars).fill('').map((_, index) => <div className="repetitionBox"/>))
        setRepEmpty(new Array(data % total_rep_bars).fill('').map((_, index) => <div className="emptyRepBox"/>))
      }
    });
  }, []);

  const logout = () => {
    set(ref(db, '/_device_user'), "_no_user")
    setUser("_no_user")
    navigate("/scores");
  }

  console.log(user)
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
        <div className="buttonWrapper">{user == "_no_user" ? "" : <Button variant="contained" component={Link} to="/scores">Highscores</Button>}</div>
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
          <div className="fillSpace">
            {emptyRep}
            {repReading}
          </div>
        </div>
        <div className="column">
          <h2>Completed Sets</h2>
          <div className='userBox'>
            {user}
          </div>
          <div className='scoreBox'><div>
              Total Workouts: {score}
              </div>
              {/* <div>
              Last Week: {score}
              </div>   */}
          </div>
          <div className='scoreBox'>
              Current Score: {score}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reader;
