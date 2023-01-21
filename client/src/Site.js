import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Highscores from "./Highscores";
import Reader from "./Reader";


//Rerturn webpage as route header and page body, with endpoints further protected under RequireAuth component
const Site = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/scores" element={<Highscores />} />
                    <Route path="/reader" element={<Reader />} />
                    <Route
                            path="*"
                            element={<Navigate to="/scores" replace />}
                        />
                </Routes>
            </Router>
        </div>
    )
}

export default Site;