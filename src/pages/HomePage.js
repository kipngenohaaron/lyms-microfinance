import React from 'react';

const HomePage = () => (
  <div className="container mt-5">
    <h1>Welcome to Lyms Microfinance</h1>
    <p>Your number one microfinance solution for Salary and Business Loans.</p>
    <div className="row mt-4">
      <div className="col-md-6">
        <h3>Salary Loans</h3>
        <p>Quick and easy salary advance loans with minimal requirements.</p>
        <a className="btn btn-primary" href="/apply?type=salary">Apply Now</a>
      </div>
      <div className="col-md-6">
        <h3>Business Loans</h3>
        <p>Short-term business loans with flexible weekly repayment plans.</p>
        <a className="btn btn-primary" href="/apply?type=business">Apply Now</a>
      </div>
    </div>
  </div>
);

export default HomePage;
