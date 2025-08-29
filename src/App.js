import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import SignupSuccess from "./pages/signup-success";
import Login from "./pages/login";
import Welcome from "./pages/welcome";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup-success" element={<SignupSuccess />} />
                <Route path="/login" element={<Login />} />
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        </Router>
    );
}

export default App;
