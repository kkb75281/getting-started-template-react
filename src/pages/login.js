import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { skapi } from "../skapi";

const Login = () => {
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
            <h2>Login Page</h2>
            <form
                action="/welcome"
                onSubmit={(e) =>
                    // If the login is successful, it will redirect the user to the welcome.html page.
                    // If the login is unsuccessful, it will show an alert with the error message.
                    skapi.login(e.nativeEvent).catch(async (err) => {
                        if (err.code === "USER_IS_DISABLED") {
                            // If the user account is disabled, you can ask the user if they want to recover their account.
                            // If they do, we will call skapi.recoverAccount() to send a recovery email to the user.
                            // Then we will redirect the user to the recover-account page that gives the user instructions to recover their account.
                            let recover = window.confirm(
                                "Your account is disabled. Would you like to recover your account?"
                            );
                            if (recover) {
                                await skapi.recoverAccount();
                                navigate("/recover-account");
                                return;
                            }
                        } else {
                            alert(err.message);
                        }
                    })
                }
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                />
                <br />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;
