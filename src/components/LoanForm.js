// // components/LoanForm.js
// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Button, Form } from 'react-bootstrap';
// import LoanBreakdown from './LoanBreakdown';  // Display loan breakdown component
// import FileUpload from './FileUpload';      // File upload component
// import Loader from './Loader';              // Loading spinner component

// const LoanForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [loanBreakdown, setLoanBreakdown] = useState({
//     totalInterest: 0,
//     totalPayable: 0,
//     weeklyInstallment: 0,
//   });

//   const formik = useFormik({
//     initialValues: {
//       fullName: '',
//       phoneNumber: '',
//       loanAmount: '',
//       loanDuration: 5,
//       referralSource: '',
//       referAFriend: false,
//     },
//     validationSchema: Yup.object({
//       fullName: Yup.string().required('Full name is required'),
//       phoneNumber: Yup.string().required('Phone number is required'),
//       loanAmount: Yup.number().required('Loan amount is required').min(500, 'Minimum loan is 500'),
//       loanDuration: Yup.number().required('Loan duration is required').min(1).max(5),
//     }),
//     onSubmit: (values) => {
//       setLoading(true);
//       setTimeout(() => {
//         setLoading(false);
//         alert(`Loan application submitted! Referral source: ${values.referralSource}`);
//       }, 2000);
//     },
//   });

//   useEffect(() => {
//     const calculateLoanBreakdown = () => {
//       const amount = parseFloat(formik.values.loanAmount || 0);
//       const duration = parseInt(formik.values.loanDuration, 10);
//       const interestRate = 0.05;  // 5% weekly interest
//       const totalInterest = amount * interestRate * duration;
//       const totalPayable = amount + totalInterest;
//       const weeklyInstallment = totalPayable / duration;
//       setLoanBreakdown({
//         totalInterest,
//         totalPayable,
//         weeklyInstallment,
//       });
//     };

//     calculateLoanBreakdown();
//   }, [formik.values.loanAmount, formik.values.loanDuration]);

//   return (
//     <div>
//       {loading && <Loader />}
//       <h2>Loan Application</h2>
//       <Form onSubmit={formik.handleSubmit}>
//         {/* Add fields for Name, Phone, etc. */}
//         {/* Display Loan Breakdown */}
//         <LoanBreakdown breakdown={loanBreakdown} />

//         {/* Conditional File Uploads */}
//         <FileUpload />

//         <Button type="submit">Submit Application</Button>
//       </Form>
//     </div>
//   );
// };

// export default LoanForm;
// src/components/LoanForm.js
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import LoanBreakdown from './LoanBreakdown';
import FileUpload from './FileUpload';
import Loader from './Loader';

const LoanForm = () => {
  const [loading, setLoading] = useState(false);
  const [loanBreakdown, setLoanBreakdown] = useState({
    totalInterest: 0,
    totalPayable: 0,
    weeklyInstallment: 0,
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      loanAmount: '',
      loanDuration: 5,
      referralSource: '',
      referAFriend: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      phoneNumber: Yup.string().required('Phone number is required'),
      loanAmount: Yup.number().required('Loan amount is required').min(500, 'Minimum loan is 500'),
      loanDuration: Yup.number().required('Loan duration is required').min(1).max(5),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(`Loan application submitted! Referral source: ${values.referralSource}`);
      }, 2000);
    },
  });

  useEffect(() => {
    const calculateLoanBreakdown = () => {
      const amount = parseFloat(formik.values.loanAmount || 0);
      const duration = parseInt(formik.values.loanDuration, 10);
      const interestRate = 0.05; // 5% weekly interest
      const totalInterest = amount * interestRate * duration;
      const totalPayable = amount + totalInterest;
      const weeklyInstallment = totalPayable / duration;
      setLoanBreakdown({
        totalInterest,
        totalPayable,
        weeklyInstallment,
      });
    };

    calculateLoanBreakdown();
  }, [formik.values.loanAmount, formik.values.loanDuration]);

  return (
    <div>
      {loading && <Loader />}
      <h2>Loan Application</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            name="fullName"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          {formik.errors.fullName && <div className="text-danger">{formik.errors.fullName}</div>}
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone number"
            name="phoneNumber"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
          {formik.errors.phoneNumber && <div className="text-danger">{formik.errors.phoneNumber}</div>}
        </Form.Group>

        <Form.Group controlId="loanAmount">
          <Form.Label>Loan Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter loan amount"
            name="loanAmount"
            onChange={formik.handleChange}
            value={formik.values.loanAmount}
          />
          {formik.errors.loanAmount && <div className="text-danger">{formik.errors.loanAmount}</div>}
        </Form.Group>

        <LoanBreakdown breakdown={loanBreakdown} />

        <FileUpload />

        <Button type="submit">Submit Application</Button>
      </Form>
    </div>
  );
};

export default LoanForm;
