import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { skapi } from "../skapi";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Please enter your email address");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await skapi.forgotPassword({ email });

            navigate(`/reset-password?email=${encodeURIComponent(email)}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="forgot-password">
            <button
                onClick={() => navigate("/")}
                aria-label="Go back to home page"
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

            <h1>Forgot Password</h1>

            <p>
                Input your login email address below and click on 'Submit'.
                <br />
                You will receive an email with a 6 digits verification code for
                resetting your password.
            </p>

            <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <label
                        htmlFor="email"
                        style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@account.email"
                        required
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            fontSize: "1rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>

                <div style={{ textAlign: "right" }}>
                    <input
                        type="submit"
                        value={isLoading ? "Submitting..." : "Submit"}
                        disabled={isLoading}
                        style={{
                            padding: "0.5rem 1rem",
                            fontSize: "1rem",
                            cursor: isLoading ? "not-allowed" : "pointer",
                            opacity: isLoading ? 0.7 : 1,
                        }}
                    />
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

            <p style={{ marginTop: "2rem" }}>
                <strong>Note: </strong>
                If your account's email address is not verified, you will not be
                able to reset your password.
            </p>
        </main>
    );
};

export default ForgotPassword;
