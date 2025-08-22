import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { skapi } from "../skapi";

const UpdateProfile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [emailPublic, setEmailPublic] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        skapi
            .getProfile()
            .then((userData) => {
                if (!userData) {
                    // If the user is not logged in, redirect the user to the index page.
                    navigate("/");
                    return;
                }

                // Set the user variable.
                // This variable can also be used when the user clicks on the email verification link.
                setUser(userData);
                setEmail(userData.email);
                setName(userData.name);
                setBirthdate(userData.birthdate || "");
                setEmailPublic(
                    // If the user's email is not verified, we will disable the email public checkbox.
                    // User needs to verify their email before they can make their email public.
                    userData.email_public && userData.email_verified
                );
                setEmailVerified(userData.email_verified);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }, [navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            await skapi.updateProfile({
                email,
                name,
                birthdate,
                email_public: emailPublic,
            });

            navigate("/welcome");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleVerifyEmail = async () => {
        if (!user) return;

        const userConfirm = window.confirm(
            `We will send a verification email to ${user.email}. Continue?`
        );

        if (userConfirm) {
            try {
                await skapi.verifyEmail();
                navigate("/email-verification");
            } catch (err) {
                alert(err.message);
            }
        }
    };

    // Set the email public checkbox to checked if the user's email is public and verified.
    const handleEmailPublicChange = (e) => {
        if (!emailVerified) {
            return;
        }

        setEmailPublic(e.target.checked);
    };

    if (isLoading) {
        return <div>Loading user profile...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        // User shouldn't be here if not logged in
        return null;
    }

    return (
        <main className="update-profile">
            <a href="/welcome">Back</a>
            <form onSubmit={handleUpdateProfile}>
                <h1>Update Profile</h1>

                <label for="email">Login Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                />

                <label for="name">Your Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name (required)"
                    required
                />

                <label for="birthdate">Birthday</label>
                <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                />

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <label
                        for="emailPublic"
                        style={{
                            minWidth: "110px",
                            display: "inline-block",
                            marginRight: "8px",
                        }}
                    >
                        Email to Public
                    </label>
                    <input
                        id="emailPublic"
                        type="checkbox"
                        checked={emailPublic}
                        onChange={handleEmailPublicChange}
                        disabled={!emailVerified}
                    />
                    {!emailVerified && (
                        <small style={{ marginLeft: "8px" }}>
                            Email verification required
                        </small>
                    )}
                </div>

                <div>
                    <label
                        for="emailVerified"
                        style={{
                            minWidth: "110px",
                            display: "inline-block",
                            marginRight: "8px",
                        }}
                    >
                        Email Verified
                    </label>
                    <span style={{ fontWeight: "bold" }}>
                        {emailVerified ? "Yes" : "No"}
                    </span>

                    {!emailVerified && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleVerifyEmail();
                            }}
                            style={{ marginLeft: "10px" }}
                        >
                            Click to verify your email
                        </button>
                    )}
                </div>
                <button tyep="submit">Update</button>

                <div
                    style={{
                        textAlign: "center",
                        margin: "10px auto 0",
                        display: "inline-block",
                        width: "100%",
                    }}
                >
                    <small>
                        <a href="/change-password">Change Password</a>
                    </small>
                </div>
            </form>
        </main>
    );
};

export default UpdateProfile;
