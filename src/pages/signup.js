import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        <div>
            <a href="/">Back</a>
            <h2>Signup Page</h2>
            {/* When signup_confirmation option is set to true, User will be required to confirm their email address before they can login. */}
            <form
                action="/signup-success"
                onSubmit={(e) => {
                    skapi
                        .signup(e.nativeEvent, { signup_confirmation: true })
                        .catch((err) => {
                            alert(err.message);
                        });
                }}
            >
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Login Email</td>
                            <td>
                                <input
                                    name="email"
                                    placeholder="your@email.com"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Set Password</td>
                            <td>
                                <input
                                    type="password"
                                    name="password"
                                    min="6"
                                    placeholder="At least 6 characters"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Your Name</td>
                            <td>
                                <input
                                    name="name"
                                    placeholder="Your name (required)"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td
                                style={{
                                    textAlign: "right",
                                }}
                            >
                                <small>
                                    <a href="/login">
                                        Already have an account?
                                    </a>
                                </small>
                                <br />
                                <br />
                                <input type="submit" value="Sign Up" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Signup;
