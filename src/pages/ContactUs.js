// src/pages/ContactUs.js
import React from 'react';
import './contact-us.css';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <p>We're here to help. Get in touch with us:</p>
      <ul>
        <li>Email: support@lymsmicrofinance.com</li>
        <li>Phone: +254-700-123456</li>
        <li>Address: Nairobi, Kenya</li>
      </ul>
      <form>
        <div>
          <label>Name</label>
          <input type="text" placeholder="Your Name" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Your Email" />
        </div>
        <div>
          <label>Message</label>
          <textarea placeholder="Your Message"></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
