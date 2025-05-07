import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { skapi } from "../skapi";

const EmailVerification = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if the user is not logged in, redirect the user to index page.
    useEffect(() => {
        skapi
            .getProfile()
            .then((userData) => {
                if (userData) {
                    setUser(userData);
                } else {
                    navigate("/");
                }
            })
            .catch(() => {
                navigate("/");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [navigate]);

    const handleResendCode = async (e) => {
        e.preventDefault();

        if (!user) return;

        const userConfirm = window.confirm(
            `We will send a verification email to ${user.email}. Continue?`
        );

        if (userConfirm) {
            try {
                await skapi.verifyEmail();
                alert("Verification email has been sent.");
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
            await skapi.verifyEmail({
                target: {
                    elements: {
                        code: { value: code },
                    },
                },
            });

            alert("Your email is verified.");

            navigate("/update-profile");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <main className="email-verification">
            <button
                onClick={() => navigate("/update-profile")}
                aria-label="Go back to update profile"
                style={{
                    background: "none",
                    border: "none",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                    padding: 0,
                    fontSize: "1rem",
                    marginBottom: "1rem",
                }}
            >
                Back
            </button>

            <h1>Email Verification</h1>

            <p>
                Please check your email for the verification code.
                <br />
                Enter the received code below and click verify.
            </p>

            <p>
                If you have not received the code, please check your spam
                folder.
                <br />
                Or click{" "}
                <button
                    onClick={handleResendCode}
                    style={{
                        background: "none",
                        border: "none",
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: "1rem",
                    }}
                >
                    HERE
                </button>{" "}
                to resend.
            </p>

            <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
                <div
                    id="div_singleInput"
                    style={{
                        display: "flex",
                        gap: "1rem",
                        flexDirection: "column",
                    }}
                >
                    <input
                        type="text"
                        name="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="6 digits code"
                        required
                        style={{
                            padding: "0.5rem",
                            fontSize: "1rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />
                    <div style={{ textAlign: "right" }}>
                        <input
                            type="submit"
                            value={isLoading ? "Verifying..." : "Verify"}
                            disabled={isLoading}
                            style={{
                                padding: "0.5rem 1rem",
                                fontSize: "1rem",
                                cursor: isLoading ? "not-allowed" : "pointer",
                                opacity: isLoading ? 0.7 : 1,
                            }}
                        />
                    </div>
                </div>
            </form>

            {error && (
                <div
                    className="error-message"
                    style={{
                        color: "red",
                        marginTop: "1rem",
                        padding: "0.5rem",
                        backgroundColor: "#ffebee",
                        borderRadius: "4px",
                    }}
                >
                    {error}
                </div>
            )}
        </main>
    );
};

export default EmailVerification;
