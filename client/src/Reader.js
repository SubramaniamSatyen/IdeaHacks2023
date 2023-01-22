import './App.css';
import { useEffect, useState } from 'react';
import { db } from "./firebase";
import { onValue, ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useAuth } from './Auth';
import { FiHeart } from "react-icons/fi";


const total_strength_bars = 12
const total_rep_bars = 6;

function Reader() {
  const [strengthReading, setStrength] = useState(<div className="progressBox"/>);
  const [emptyReading, setEmpty] = useState(new Array((total_strength_bars - 1) > 0 ? total_strength_bars - 1 : 0).fill('').map((_, index) => <div className="emptyBox"/>));

  const [score, setScore] = useState(0);
  const [repReading, setRep] = useState();
  const [emptyRep, setRepEmpty] = useState(new Array((total_rep_bars) > 0 ? total_rep_bars : 0).fill('').map((_, index) => <div className="emptyRepBox"/>));
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [rand, setRand] = useState( Math.random() * 20 + 80);



  useEffect(() => {
    const query = ref(db, "/_device_reading");
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      
      const procData = parseInt(data);
      console.log(procData);
      if (procData) {
        setStrength(new Array(procData > total_strength_bars ? total_strength_bars : procData).fill('').map((_, index) => <div className="progressBox"/>))
        setEmpty(new Array((total_strength_bars - procData > 0 ? total_strength_bars - procData : 0)).fill('').map((_, index) => <div className="emptyBox"/>))
        if (procData >= 8){
          setScore(score + 1);
        }
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
    setRand(parseInt(Math.random() * 20 + 80))
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
        <div className="buttonWrapper">{user == "_no_user" ? "" : <Button variant="contained" component={Link} to="/scores">Leaderboard </Button>}</div>
      </div>
      <div className="columnWrapper">
        <div className="column">
          <h2>Muscle Reading</h2>
            <div className="fillSpace">
              {emptyReading}
              {strengthReading}
            </div>
          </div>
        {/* <div className="column">
          <h2>Repetitions in Set</h2>
          <div className="fillSpace">
            {emptyRep}
            {repReading}
          </div>
        </div> */}
        <div className="column">
          <div className="userRow">
            <div className="heartBox">
              <FiHeart style={{width: 40, height: 40, color: 'red'}}/>
            </div>
            <div className='userBox'>
              {user}
            </div>
          </div>
          <div className='hrBox'>
              <div>
              Heart Rate: {rand}
              </div>
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
