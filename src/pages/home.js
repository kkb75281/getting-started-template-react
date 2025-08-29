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
            <h1>Index</h1>
            <p>
                This is a HTML template for authentication features using{" "}
                <a href="https://www.skapi.com">Skapi</a>.
                <br />
                No CSS is used in this template. So don't let the design fool
                you.
                <br />
                This template packs full solid authentication features you can
                use in your HTML application.
            </p>
            <a href="/login">Login</a>
            <span> | </span>
            <a href="/signup">Sign-Up</a>
        </main>
    );
};

export default Home;
