// Welcome.js
import React, { useState, useEffect } from 'react';
import { skapi } from '../skapi';

function Welcome() {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    skapi
      .getProfile()
      .then((profile) => {
        if (!profile) {
          window.location.href = '/login';
        } else {
          setWelcomeMessage(`Welcome, ${profile.email}.`);
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }, []);

  return (
    <div>
      <h1 id="welcome_message">{welcomeMessage}</h1>
    </div>
  );
}

export default Welcome;
