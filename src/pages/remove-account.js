import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { skapi } from "../skapi";

const RemoveAccount = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        skapi
            .getProfile()
            .then((userData) => {
                if (!userData) {
                    navigate("/");
                    return;
                }

                setIsLoading(false);
            })
            .catch(() => {
                navigate("/");
            });
    }, [navigate]);

    const handleRemoveAccount = async (e) => {
        e.preventDefault();

        if (window.confirm("Are you sure you want to remove your account?")) {
            try {
                await skapi.disableAccount();

                alert("Your account is removed.");

                navigate("/");
            } catch (err) {
                alert(err.message);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="remove-account">
            <a href="/welcome">Back</a>

            <section>
                <h1>Remove Account</h1>

                <h3>Would you like to remove your account?</h3>

                <p>
                    Once you remove your account, your account will still be
                    recoverable within 6 months by logging in and verifying your
                    email address.
                    <br />
                    After 6 months, all your data will be deleted and cannot be
                    recovered.
                </p>

                <p>
                    <strong>Note: </strong>Your account cannot be recovered if
                    you have not verified your email address.
                </p>
                <p>If you like to proceed, please click the button below.</p>

                <form onSubmit={handleRemoveAccount}>
                    <button type="submit">Remove Account</button>
                </form>
            </section>
        </main>
    );
};

export default RemoveAccount;
