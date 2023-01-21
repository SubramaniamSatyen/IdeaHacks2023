import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Highscores from "./Highscores";
import Reader from "./Reader";
import SignIn from "./SignIn"
import { AuthProvider } from "./Auth";

//Rerturn webpage as route header and page body, with endpoints further protected under RequireAuth component
const Site = () => {
    return (
        <div>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/scores" element={<Highscores />} />
                        <Route path="/reader" element={<Reader />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route
                                path="*"
                                element={<Navigate to="/scores" replace />}
                            />
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    )
}

export default Site;