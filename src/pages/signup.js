import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { skapi } from "../skapi";

const Signup = () => {
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
            <a href="/">Back</a>

            {/* When signup_confirmation option is set to true, User will be required to confirm their email address before they can login. */}
            <form
                action="/signup-success"
                onSubmit={(e) => {
                    skapi
                        .signup(e.nativeEvent, {
                            signup_confirmation: true,
                        })
                        .catch((err) => {
                            alert(err.message);
                        });
                }}
            >
                <h2>Sign up</h2>
                <label for="email">Login Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                />

                <label for="password">Set Password</label>
                <input
                    type="password"
                    name="password"
                    minlength="6"
                    placeholder="At least 6 characters"
                    required
                />

                <label for="name">Your Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                />
                <br />

                <button type="submit">Sign Up</button>

                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <small>
                        <Link to="/login">Already have an account?</Link>
                    </small>
                </div>
            </form>
        </main>
    );
};

export default Signup;
