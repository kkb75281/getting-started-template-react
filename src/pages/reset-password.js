import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { skapi } from "../skapi";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // The email address is passed from the forgot password page.
        // We can get the email address from the hash of the url.
        // The hash is the part of the url after the # sign.
        // We can get the hash using location.hash.
        // Then, we can set the value of the email input field for the user.
        // Email input field is hidden but it is required for the reset password method.
        const hashEmail = decodeURIComponent(location.hash.slice(1));
        setEmail(hashEmail);
    }, [location]);

    const handleResendCode = async (e) => {
        e.preventDefault();

        // When this is clicked, we will manually execute the skapi.forgotPassword() method to re-send the verification code to the user's email address.
        // When successful, we will replace the content of the parent element of this element with a message: Verification code has been sent.
        const userConfirm = window.confirm(
            `We will send a verification code to ${email}. Continue?`
        );

        if (userConfirm) {
            try {
                await skapi.forgotPassword({ email });
                alert("Verification code has been sent.");
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            await skapi.resetPassword({
                target: {
                    elements: {
                        email: { value: email },
                        code: { value: code },
                        new_password: { value: newPassword },
                    },
                },
            });

            alert("Password has been reset.");

            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="reset-password">
            <a href="/index">Back</a> <h1>Reset Password</h1>
            <p>
                Enter the 6 digits verification code you may have received in
                your email and set new password below.
            </p>
            <p>
                If you have not received the code, please check your spam
                folder.
                <br />
                Or click <button onClick={handleResendCode}>HERE</button> to
                resend.
            </p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={email}
                    readOnly
                    hidden
                />

                <table>
                    <tbody>
                        <tr>
                            <td>Code</td>
                            <td>
                                <input
                                    type="text"
                                    name="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="6 digits code"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>New Password</td>
                            <td>
                                <input
                                    type="password"
                                    name="new_password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    placeholder="New Password"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td style={{ textAlign: "right" }}>
                                <br />
                                <input
                                    type="submit"
                                    value={
                                        isLoading
                                            ? "Resetting..."
                                            : "Change Password"
                                    }
                                    disabled={isLoading}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <p>
                <strong>Note: </strong>
                If your account's email address is not verified, you will not be
                able to reset your password.
            </p>
            {error && <div className="error-message">{error}</div>}
        </main>
    );
};

export default ResetPassword;
