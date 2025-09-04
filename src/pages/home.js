import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { skapi } from "../skapi";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in.
        // If the user is logged in, redirect the user to welcome page.
        skapi
            .getProfile()
            .then((user) => {
                if (user) {
                    navigate("/welcome");
                }
            })
            .catch((err) => {
                window.alert(err.message);
            });
    }, [navigate]);

    return (
        <main>
            <h1>Skapi React Starter Template</h1>
            <p>This is a React starter template for Skapi.</p>
            <p>
                This template includes basic features for your React
                application:
            </p>
            <ul>
                <li>Signup</li>
                <li>Signup email verification</li>
                <li>Login</li>
            </ul>

            <br />

            <h2>Important!</h2>
            <p>
                Replace the SERVICE_ID and OWNER_ID values in src/skapi.js with
                your own service information.
            </p>
            <p>
                You can get your own service ID from{" "}
                <a href="https://www.skapi.com">Skapi</a>.
            </p>

            <br />

            <p style={{ fontWeight: "bold" }}>Login or Sign-up below:</p>
            <a href="/login">Login</a>
            <span> | </span>
            <a href="/signup">Sign-Up</a>
        </main>
    );
};

export default Home;
