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
            <a href="/update-profile">Back</a>

            <form onSubmit={handleSubmit}>
                <h1>Change Password</h1>

                <label for="current_password">Current Password</label>
                <input
                    type="password"
                    name="current_password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                />

                <label for="new_password">New Password</label>
                <input
                    type="password"
                    name="new_password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                />
                <button
                    type="submit"
                    value={isLoading ? "Changing..." : "Change"}
                    disabled={isLoading}
                >
                    Change
                </button>
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
