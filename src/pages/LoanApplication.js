import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Tooltip, Button, Modal } from 'react-bootstrap';
import { AiOutlineInfoCircle } from 'react-icons/ai'; // Add icon for loan type
import 'bootstrap/dist/css/bootstrap.min.css';

const LoanApplication = () => {
  const [searchParams] = useSearchParams();
  const loanType = searchParams.get('type') || 'salary'; // Default to 'salary' if not specified

  const [loanBreakdown, setLoanBreakdown] = useState({
    totalInterest: 0,
    totalPayable: 0,
    weeklyInstallment: 0,
  });

  const [showModal, setShowModal] = useState(false);

  // Formik setup for form validation
  const formik = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      idNumber: '',
      loanAmount: '',
      loanDuration: 5, // Default duration in weeks
      payslips: null,
      bankStatement: null,
      businessCertificate: null,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      phoneNumber: Yup.string().required('Phone number is required'),
      idNumber: Yup.string().required('ID number is required'),
      loanAmount: Yup.number()
        .min(500, 'Minimum loan amount is 500 KES')
        .required('Loan amount is required'),
      loanDuration: Yup.number()
        .min(1, 'Minimum duration is 1 week')
        .max(5, 'Maximum duration is 5 weeks')
        .required('Loan duration is required'),
    }),
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
      alert('Your application has been successfully submitted!');
    },
  });

  // Calculate loan breakdown (interest, total repayable, weekly installment)
  const calculateLoanBreakdown = () => {
    const amount = parseFloat(formik.values.loanAmount || 0);
    const duration = parseInt(formik.values.loanDuration || 1, 10);
    const weeklyInterestRate = 0.05; // 5% weekly interest rate

    const totalInterest = amount * weeklyInterestRate * duration;
    const totalPayable = amount + totalInterest;
    const weeklyInstallment = totalPayable / duration;

    setLoanBreakdown({ totalInterest, totalPayable, weeklyInstallment });
  };

  useEffect(() => {
    calculateLoanBreakdown(); // Recalculate breakdown when form values change
  }, [formik.values.loanAmount, formik.values.loanDuration]);

  // Function to handle document preview
  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    formik.setFieldValue(fieldName, file);
  };

  return (
    <div className="container mt-5">
      <h2>Loan Application</h2>
      <p>Apply for a {loanType === 'salary' ? 'Salary Loan' : 'Business Loan'}.</p>

      <form onSubmit={formik.handleSubmit} className="mt-4">
        {/* Full Name */}
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          {formik.errors.fullName && <div className="text-danger">{formik.errors.fullName}</div>}
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
          {formik.errors.phoneNumber && <div className="text-danger">{formik.errors.phoneNumber}</div>}
        </div>

        {/* National ID / Passport */}
        <div className="mb-3">
          <label htmlFor="idNumber" className="form-label">National ID/Passport</label>
          <input
            id="idNumber"
            name="idNumber"
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.idNumber}
          />
          {formik.errors.idNumber && <div className="text-danger">{formik.errors.idNumber}</div>}
        </div>

        {/* Loan Amount */}
        <div className="mb-3">
          <label htmlFor="loanAmount" className="form-label">Loan Amount</label>
          <input
            id="loanAmount"
            name="loanAmount"
            type="number"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.loanAmount}
          />
          {formik.errors.loanAmount && <div className="text-danger">{formik.errors.loanAmount}</div>}
        </div>

        {/* Loan Duration */}
        <div className="mb-3">
          <label htmlFor="loanDuration" className="form-label">Loan Duration (in weeks)</label>
          <input
            id="loanDuration"
            name="loanDuration"
            type="number"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.loanDuration}
          />
          {formik.errors.loanDuration && <div className="text-danger">{formik.errors.loanDuration}</div>}
        </div>

        {/* Conditional File Uploads */}
        {loanType === 'salary' && (
          <>
            <div className="mb-3">
              <label htmlFor="payslips" className="form-label">Upload Payslips</label>
              <input
                id="payslips"
                name="payslips"
                type="file"
                className="form-control"
                onChange={(e) => handleFileUpload(e, 'payslips')}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bankStatement" className="form-label">Upload Bank Statement</label>
              <input
                id="bankStatement"
                name="bankStatement"
                type="file"
                className="form-control"
                onChange={(e) => handleFileUpload(e, 'bankStatement')}
              />
            </div>
          </>
        )}

        {loanType === 'business' && (
          <div className="mb-3">
            <label htmlFor="businessCertificate" className="form-label">Business Registration Certificate</label>
            <input
              id="businessCertificate"
              name="businessCertificate"
              type="file"
              className="form-control"
              onChange={(e) => handleFileUpload(e, 'businessCertificate')}
            />
          </div>
        )}

        {/* Loan Breakdown */}
        <h4 className="mt-4">Loan Breakdown</h4>
        <p><strong>Total Interest:</strong> KES {loanBreakdown.totalInterest.toFixed(2)}</p>
        <p><strong>Total Payable:</strong> KES {loanBreakdown.totalPayable.toFixed(2)}</p>
        <p><strong>Weekly Installment:</strong> KES {loanBreakdown.weeklyInstallment.toFixed(2)}</p>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3">Submit Application</button>

        {/* Tooltip Info for Loan Type */}
        <div className="mt-3">
          <Tooltip placement="top" title="Choose the loan type depending on your application">
            <AiOutlineInfoCircle size={25} />
          </Tooltip>
        </div>
      </form>

      {/* Modal for Terms & Conditions */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Loan Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>By applying for this loan, you agree to our terms and conditions...</p>
          {/* Add your actual terms here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoanApplication;
