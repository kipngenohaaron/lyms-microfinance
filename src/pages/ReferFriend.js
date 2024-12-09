// src/pages/ReferFriend.js
import React, { useState } from 'react';
import './refer-friend.css';

const ReferFriend = () => {
  const [friendEmail, setFriendEmail] = useState('');

  const handleReferral = (e) => {
    e.preventDefault();
    alert(`Thank you for referring your friend! An invitation has been sent to ${friendEmail}.`);
    setFriendEmail('');
  };

  return (
    <div className="refer-friend">
      <h1>Refer a Friend</h1>
      <p>Earn 3% cashback by referring a friend to Lyms Microfinance!</p>
      <form onSubmit={handleReferral}>
        <div>
          <label>Friend's Email</label>
          <input
            type="email"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
            placeholder="Enter your friend's email"
          />
        </div>
        <button type="submit">Send Invite</button>
      </form>
    </div>
  );
};

export default ReferFriend;
