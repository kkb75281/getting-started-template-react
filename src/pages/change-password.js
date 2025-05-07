import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { skapi } from "../skapi";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        skapi
            .getProfile()
            .then((user) => {
                if (!user) {
                    navigate("/");
                }
            })
            .catch(() => {
                navigate("/");
            });
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm("Are you sure you want to change your password?")) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await skapi.changePassword(e.nativeEvent);

            alert("Password has been changed.");

            navigate("/update-profile");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="change-password">
            <button
                onClick={() => navigate("/update-profile")}
                style={{
                    background: "none",
                    border: "none",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                }}
                aria-label="Go back to update profile"
            >
                Back
            </button>

            <h1>Change Password</h1>

            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Current Password</td>
                            <td>
                                <input
                                    type="password"
                                    name="current_password"
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                    placeholder="At least 6 characters"
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
                                    placeholder="At least 6 characters"
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
                                    value={isLoading ? "Changing..." : "Change"}
                                    disabled={isLoading}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

            {error && (
                <div
                    className="error-message"
                    style={{ color: "red", marginTop: "1rem" }}
                >
                    {error}
                </div>
            )}
        </main>
    );
};

export default ChangePassword;
