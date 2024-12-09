// import React from 'react';

// const Navbar = () => (
//   <nav className="navbar navbar-expand-lg navbar-light bg-light">
//     <div className="container">
//       <a className="navbar-brand" href="/">Lyms Microfinance</a>
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarNav"
//         aria-controls="navbarNav"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav ms-auto">
//           <li className="nav-item">
//             <a className="nav-link" href="/apply">Apply Now</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="/dashboard">Dashboard</a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </nav>
// );

// export default Navbar;
// components/Navbar.js
// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './navbar.css';

const Navbar = () => {
  const isAuthenticated = false; // Example: Adjust based on your auth state

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Lyms Microfinance</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/loan-application">Apply Loan</Link></li>
        <li><Link to="/refer">Refer a Friend</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/about">About Us</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/user-dashboard">Dashboard</Link></li>
            <li><button className="logout-btn">Sign Out</button></li>
          </>
        ) : (
          <li><Link to="/sign-in">Sign In</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

