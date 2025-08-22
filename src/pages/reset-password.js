import React, { useState, useEffect, useRef } from "react";
import {
    useNavigate,
    useLocation,
    Link,
    useSearchParams,
} from "react-router-dom";
import { skapi } from "../skapi";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [resendMessage, setResendMessage] = useState("");
    const resendRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // The email address is passed from the forgot password page.
        // We can get the email address from the hash of the url.
        // The hash is the part of the url after the # sign.
        // We can get the hash using location.hash.
        // Then, we can set the value of the email input field for the user.
        // Email input field is hidden but it is required for the reset password method.
        const emailFromQuery = searchParams.get("email");

        if (emailFromQuery) {
            setEmail(emailFromQuery);
        }
    }, [searchParams]);

    const handleResendCode = async (e) => {
        e.preventDefault();

        const currentEmail = searchParams.get("email") || email;

        // When this is clicked, we will manually execute the skapi.forgotPassword() method to re-send the verification code to the user's email address.
        // When successful, we will replace the content of the parent element of this element with a message: Verification code has been sent.
        const userConfirm = window.confirm(
            `We will send a verification code to ${currentEmail}. Continue?`
        );

        if (userConfirm) {
            try {
                await skapi.forgotPassword({ email: currentEmail });
                setResendMessage("Verification code has been sent.");
            } catch (err) {
                console.log("에러콘솔 : ", err);
                alert(err.message);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await skapi.resetPassword(e.nativeEvent);
            alert("Password has been reset.");
            navigate("/login");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <main className="reset-password">
            <Link to="/">Back</Link>
            <section>
                <h1>Reset Password</h1>
                <p>
                    Enter the 6 digits verification code you may have received
                    in your email and set new password below.
                </p>
                <p ref={resendRef}>
                    If you have not received the code, please check your spam
                    folder. Or click{" "}
                    <a
                        href=""
                        onClick={handleResendCode}
                        style={{
                            color: "blue",
                            textDecoration: "underline",
                        }}
                    >
                        HERE
                    </a>{" "}
                    to resend.
                    {resendMessage && <span> {resendMessage}</span>}
                </p>

                <p>
                    <strong>Note: </strong>
                    If your account's email address is not verified, you will
                    not be able to reset your password.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="E-Mail"
                        readOnly
                        hidden
                        required
                    />

                    <label htmlFor="code">Code</label>
                    <input
                        type="text"
                        name="code"
                        id="code"
                        placeholder="6 digits code"
                        required
                    />

                    <label htmlFor="new_password">New Password</label>
                    <input
                        type="password"
                        name="new_password"
                        id="new_password"
                        placeholder="New Password"
                        required
                    />
                    <br />

                    <button type="submit">Change Password</button>
                </form>
            </section>
        </main>
    );
};

export default ResetPassword;
