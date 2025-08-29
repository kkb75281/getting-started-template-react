import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { skapi } from "../skapi";

function Welcome() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        skapi
            .getProfile()
            .then((user) => {
                if (!user) {
                    navigate("/login");
                } else {
                    setUser(user);
                }
            })
            .catch((err) => {
                window.alert(err.message);
            });
    }, [navigate]);

    const handleLogout = async () => {
        await skapi.logout();
        navigate("/");
    };

    return (
        <main>
            <h1>Login Success</h1>
            {/* Get user profile and display it on the page. */}
            <p id="WelcomeMessage">{`Welcome, ${
                user?.name || user?.email || user?.user_id
            }!`}</p>
            <pre id="UserInfo">{JSON.stringify(user, null, 2)}</pre>
            <button onClick={handleLogout}>Logout</button>
        </main>
    );
}

export default Welcome;
