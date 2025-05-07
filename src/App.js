// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import SignupSuccess from "./pages/signup-success";
import Login from "./pages/login";
import Welcome from "./pages/welcome";
import UpdateProfile from "./pages/update-profile";
import RemoveAccount from "./pages/remove-account";
import RecoverAccount from "./pages/recover-account";
import ResetPassword from "./pages/reset-password";
import ChangePassword from "./pages/change-password";
import ForgotPassword from "./pages/forgot-password";
import EmailVerification from "./pages/email-verification";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup-success" element={<SignupSuccess />} />
                <Route path="/login" element={<Login />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path="/remove-account" element={<RemoveAccount />} />
                <Route path="/recover-account" element={<RecoverAccount />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/email-verification"
                    element={<EmailVerification />}
                />
            </Routes>
        </Router>
    );
}

export default App;
