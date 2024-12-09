import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoanApplication = () => {
  const [searchParams] = useSearchParams();
  const loanType = searchParams.get('type') || 'salary'; // Default to 'salary' if not specified.

  const [loanBreakdown, setLoanBreakdown] = useState({
    totalInterest: 0,
    totalPayable: 0,
    weeklyInstallment: 0,
  });

  const calculateLoanBreakdown = (amount, duration) => {
    const weeklyInterestRate = 0.05; // 5% weekly interest rate
    const totalInterest = amount * weeklyInterestRate * duration;
    const totalPayable = amount + totalInterest;
    const weeklyInstallment = totalPayable / duration;

    setLoanBreakdown({ totalInterest, totalPayable, weeklyInstallment });
  };

  const formik = useFormik({
    initialValues: {
      loanType, // Automatically set based on URL parameter
      fullName: '',
      phoneNumber: '',
      idNumber: '',
      address: '',
      loanAmount: '',
      loanDuration: 5, // Default to 5 weeks
      employerName: '',
      businessName: '',
      payslips: null,
      bankStatement: null,
      businessCertificate: null,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required.'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must contain only digits.')
        .required('Phone number is required.'),
      idNumber: Yup.string().required('ID/Passport number is required.'),
      address: Yup.string().required('Address is required.'),
      loanAmount: Yup.number()
        .min(500, 'Minimum loan amount is 500 KES.')
        .required('Loan amount is required.'),
      loanDuration: Yup.number()
        .min(1, 'Minimum duration is 1 week.')
        .max(5, 'Maximum duration is 5 weeks.')
        .required('Loan duration is required.'),
      employerName: Yup.string().when('loanType', (loanType, schema) =>
        loanType === 'salary'
          ? schema.required('Employer name is required for salary loans.')
          : schema
      ),
      businessName: Yup.string().when('loanType', (loanType, schema) =>
        loanType === 'business'
          ? schema.required('Business name is required for business loans.')
          : schema
      ),
    }),
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
      alert('Application submitted successfully!');
    },
  });

  const handleInputChange = (e) => {
    formik.handleChange(e);
    const { loanAmount, loanDuration } = formik.values;
    if (loanAmount && loanDuration) {
      calculateLoanBreakdown(parseFloat(loanAmount), parseInt(loanDuration, 10));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Loan Application</h2>
      <p>Apply for a {loanType === 'salary' ? 'Salary Loan' : 'Business Loan'}.</p>

      <form onSubmit={formik.handleSubmit} className="mt-4">
        {/* Loan Type Selector */}
        <div className="mb-3">
          <label htmlFor="loanType" className="form-label">Loan Type</label>
          <select
            id="loanType"
            name="loanType"
            className="form-control"
            onChange={(e) => {
              formik.setFieldValue('loanType', e.target.value);
              formik.setFieldValue('employerName', '');
              formik.setFieldValue('businessName', '');
            }}
            value={formik.values.loanType}
          >
            <option value="salary">Salary Loan</option>
            <option value="business">Business Loan</option>
          </select>
        </div>

        {/* Personal Information */}
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="form-control"
            onChange={handleInputChange}
            value={formik.values.fullName}
          />
          {formik.errors.fullName && <div className="text-danger">{formik.errors.fullName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            className="form-control"
            onChange={handleInputChange}
            value={formik.values.phoneNumber}
          />
          {formik.errors.phoneNumber && <div className="text-danger">{formik.errors.phoneNumber}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="idNumber" className="form-label">ID/Passport Number</label>
          <input
            id="idNumber"
            name="idNumber"
            type="text"
            className="form-control"
            onChange={handleInputChange}
            value={formik.values.idNumber}
          />
          {formik.errors.idNumber && <div className="text-danger">{formik.errors.idNumber}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            className="form-control"
            onChange={handleInputChange}
            value={formik.values.address}
          />
          {formik.errors.address && <div className="text-danger">{formik.errors.address}</div>}
        </div>

        {/* Loan Details */}
        <div className="mb-3">
          <label htmlFor="loanAmount" className="form-label">Loan Amount</label>
          <input
            id="loanAmount"
            name="loanAmount"
            type="number"
            className="form-control"
            onChange={handleInputChange}
            value={formik.values.loanAmount}
          />
          {formik.errors.loanAmount && <div className="text-danger">{formik.errors.loanAmount}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="loanDuration" className="form-label">Loan Duration (weeks)</label>
          <input
            id="loanDuration"
            name="loanDuration"
            type="number"
            className="form-control"
            onChange={handleInputChange}
            value={formik.values.loanDuration}
          />
          {formik.errors.loanDuration && <div className="text-danger">{formik.errors.loanDuration}</div>}
        </div>

        {/* Conditional Inputs */}
        {formik.values.loanType === 'salary' && (
          <div className="mb-3">
            <label htmlFor="employerName" className="form-label">Employer Name</label>
            <input
              id="employerName"
              name="employerName"
              type="text"
              className="form-control"
              onChange={handleInputChange}
              value={formik.values.employerName}
            />
            {formik.errors.employerName && (
              <div className="text-danger">{formik.errors.employerName}</div>
            )}
          </div>
        )}

        {formik.values.loanType === 'business' && (
          <div className="mb-3">
            <label htmlFor="businessName" className="form-label">Business Name</label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              className="form-control"
              onChange={handleInputChange}
              value={formik.values.businessName}
            />
            {formik.errors.businessName && (
              <div className="text-danger">{formik.errors.businessName}</div>
            )}
          </div>
        )}

        {/* Loan Breakdown */}
        <h4 className="mt-4">Loan Breakdown</h4>
        <p><strong>Total Interest:</strong> KES {loanBreakdown.totalInterest.toFixed(2)}</p>
        <p><strong>Total Payable:</strong> KES {loanBreakdown.totalPayable.toFixed(2)}</p>
        <p><strong>Weekly Installment:</strong> KES {loanBreakdown.weeklyInstallment.toFixed(2)}</p>

        <button type="submit" className="btn btn-primary mt-3">Submit Application</button>
      </form>
    </div>
  );
};

export default LoanApplication;
