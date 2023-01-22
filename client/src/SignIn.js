import './App.css';
import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { db } from "./firebase";
import { ref, set } from "firebase/database";
import { useAuth } from './Auth';

function SignIn() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

  
    const usernameChange = e => {
      setUsername(e.target.value)
    }  

    const login = useCallback(
        (e) => {
            e.preventDefault();
            if (username != "") {
                set(ref(db, '/_device_user'), username)
                setUser(username);
                navigate("/reader");
            }
        },
        [username]
      );

    return (
        <div className="App">
            <div className="header">
                <div className="buttonWrapper">
            <Button variant="contained" component={Link} to="/scores">Leaderboard</Button>
            </div>
        </div>
        <div className="Login">
            <center>
            <h1>Login</h1>
                <div className="Login_Box">
                    <div className="Login">
                    <TextField  sx={{ bgcolor: '#ffffff', }} label="Username" variant="filled" value={username} onChange={usernameChange}/>
                    </div>
                    <div className="Login_Button">
                        <Button variant="contained" onClick={login}>Log In</Button>
                    </div>
                </div>
            </center>
            </div>
        </div>
      );
}

export default SignIn;