// import React, { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const LoanApplication = () => {
//   const [searchParams] = useSearchParams();
//   const loanType = searchParams.get('type') || 'salary'; // Default to 'salary' if not specified.

//   const [loanBreakdown, setLoanBreakdown] = useState({
//     totalInterest: 0,
//     totalPayable: 0,
//     weeklyInstallment: 0,
//   });

//   const formik = useFormik({
//     initialValues: {
//       fullName: '',
//       phoneNumber: '',
//       idNumber: '',
//       loanAmount: '',
//       loanDuration: 5, // Default duration in weeks.
//       payslips: null,
//       bankStatement: null,
//       businessCertificate: null,
//     },
//     validationSchema: Yup.object({
//       fullName: Yup.string().required('Full name is required'),
//       phoneNumber: Yup.string().required('Phone number is required'),
//       idNumber: Yup.string().required('ID number is required'),
//       loanAmount: Yup.number()
//         .min(500, 'Minimum loan amount is 500')
//         .required('Loan amount is required'),
//       loanDuration: Yup.number()
//         .min(1, 'Minimum duration is 1 week')
//         .max(5, 'Maximum duration is 5 weeks')
//         .required('Loan duration is required'),
//     }),
//     onSubmit: (values) => {
//       console.log('Form Submitted:', values);
//       alert('Application submitted successfully!');
//     },
//   });

//   const calculateLoanBreakdown = () => {
//     const amount = parseFloat(formik.values.loanAmount || 0);
//     const duration = parseInt(formik.values.loanDuration || 1, 10);
//     const weeklyInterestRate = 0.05; // 5% weekly interest.

//     const totalInterest = amount * weeklyInterestRate * duration;
//     const totalPayable = amount + totalInterest;
//     const weeklyInstallment = totalPayable / duration;

//     setLoanBreakdown({ totalInterest, totalPayable, weeklyInstallment });
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Loan Application</h2>
//       <p>Apply for a {loanType === 'salary' ? 'Salary Loan' : 'Business Loan'}.</p>

//       <form
//         onSubmit={formik.handleSubmit}
//         className="mt-4"
//         onChange={calculateLoanBreakdown}
//       >
//         <div className="mb-3">
//           <label htmlFor="fullName" className="form-label">Full Name</label>
//           <input
//             id="fullName"
//             name="fullName"
//             type="text"
//             className="form-control"
//             onChange={formik.handleChange}
//             value={formik.values.fullName}
//           />
//           {formik.errors.fullName && <div className="text-danger">{formik.errors.fullName}</div>}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
//           <input
//             id="phoneNumber"
//             name="phoneNumber"
//             type="text"
//             className="form-control"
//             onChange={formik.handleChange}
//             value={formik.values.phoneNumber}
//           />
//           {formik.errors.phoneNumber && <div className="text-danger">{formik.errors.phoneNumber}</div>}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="idNumber" className="form-label">National ID/Passport</label>
//           <input
//             id="idNumber"
//             name="idNumber"
//             type="text"
//             className="form-control"
//             onChange={formik.handleChange}
//             value={formik.values.idNumber}
//           />
//           {formik.errors.idNumber && <div className="text-danger">{formik.errors.idNumber}</div>}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="loanAmount" className="form-label">Loan Amount</label>
//           <input
//             id="loanAmount"
//             name="loanAmount"
//             type="number"
//             className="form-control"
//             onChange={formik.handleChange}
//             value={formik.values.loanAmount}
//           />
//           {formik.errors.loanAmount && <div className="text-danger">{formik.errors.loanAmount}</div>}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="loanDuration" className="form-label">Loan Duration (in weeks)</label>
//           <input
//             id="loanDuration"
//             name="loanDuration"
//             type="number"
//             className="form-control"
//             onChange={formik.handleChange}
//             value={formik.values.loanDuration}
//           />
//           {formik.errors.loanDuration && <div className="text-danger">{formik.errors.loanDuration}</div>}
//         </div>

//         {loanType === 'salary' && (
//           <>
//             <div className="mb-3">
//               <label htmlFor="payslips" className="form-label">Upload Payslips</label>
//               <input
//                 id="payslips"
//                 name="payslips"
//                 type="file"
//                 className="form-control"
//                 onChange={(e) => formik.setFieldValue('payslips', e.target.files[0])}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="bankStatement" className="form-label">Upload Bank Statement</label>
//               <input
//                 id="bankStatement"
//                 name="bankStatement"
//                 type="file"
//                 className="form-control"
//                 onChange={(e) => formik.setFieldValue('bankStatement', e.target.files[0])}
//               />
//             </div>
//           </>
//         )}

//         {loanType === 'business' && (
//           <div className="mb-3">
//             <label htmlFor="businessCertificate" className="form-label">Business Registration Certificate</label>
//             <input
//               id="businessCertificate"
//               name="businessCertificate"
//               type="file"
//               className="form-control"
//               onChange={(e) => formik.setFieldValue('businessCertificate', e.target.files[0])}
//             />
//           </div>
//         )}

//         <h4 className="mt-4">Loan Breakdown</h4>
//         <p><strong>Total Interest:</strong> KES {loanBreakdown.totalInterest.toFixed(2)}</p>
//         <p><strong>Total Payable:</strong> KES {loanBreakdown.totalPayable.toFixed(2)}</p>
//         <p><strong>Weekly Installment:</strong> KES {loanBreakdown.weeklyInstallment.toFixed(2)}</p>

//         <button type="submit" className="btn btn-primary mt-3">Submit Application</button>
//       </form>
//     </div>
//   );
// };

// export default LoanApplication;
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

  const formik = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      idNumber: '',
      loanAmount: '',
      loanDuration: 5, // Default duration in weeks.
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
      loanAmount: Yup.number()
        .min(500, 'Minimum loan amount is 500 KES.')
        .required('Loan amount is required.'),
      loanDuration: Yup.number()
        .min(1, 'Minimum duration is 1 week.')
        .max(5, 'Maximum duration is 5 weeks.')
        .required('Loan duration is required.'),
    }),
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
      alert('Application submitted successfully!');
    },
  });

  // Calculate loan breakdown whenever loan details change.
  const calculateLoanBreakdown = () => {
    const amount = parseFloat(formik.values.loanAmount || 0);
    const duration = parseInt(formik.values.loanDuration || 1, 10);
    const weeklyInterestRate = 0.05; // 5% weekly interest.

    const totalInterest = amount * weeklyInterestRate * duration;
    const totalPayable = amount + totalInterest;
    const weeklyInstallment = totalPayable / duration;

    setLoanBreakdown({ totalInterest, totalPayable, weeklyInstallment });
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="text-primary">Loan Application</h1>
        <p className="lead">
          Apply for a <strong>{loanType === 'salary' ? 'Salary Loan' : 'Business Loan'}</strong>.
        </p>
        <hr />
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="shadow p-4 rounded bg-light"
        onChange={calculateLoanBreakdown}
      >
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            className={`form-control ${formik.errors.fullName ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          {formik.errors.fullName && <div className="invalid-feedback">{formik.errors.fullName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="e.g., 0712345678"
            className={`form-control ${formik.errors.phoneNumber ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
          {formik.errors.phoneNumber && <div className="invalid-feedback">{formik.errors.phoneNumber}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="idNumber" className="form-label">National ID/Passport</label>
          <input
            id="idNumber"
            name="idNumber"
            type="text"
            placeholder="Enter your ID or Passport number"
            className={`form-control ${formik.errors.idNumber ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            value={formik.values.idNumber}
          />
          {formik.errors.idNumber && <div className="invalid-feedback">{formik.errors.idNumber}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="loanAmount" className="form-label">Loan Amount</label>
          <input
            id="loanAmount"
            name="loanAmount"
            type="number"
            placeholder="Enter loan amount (KES)"
            className={`form-control ${formik.errors.loanAmount ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            value={formik.values.loanAmount}
          />
          {formik.errors.loanAmount && <div className="invalid-feedback">{formik.errors.loanAmount}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="loanDuration" className="form-label">Loan Duration (weeks)</label>
          <input
            id="loanDuration"
            name="loanDuration"
            type="number"
            className={`form-control ${formik.errors.loanDuration ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            value={formik.values.loanDuration}
          />
          {formik.errors.loanDuration && <div className="invalid-feedback">{formik.errors.loanDuration}</div>}
        </div>

        {loanType === 'salary' && (
          <>
            <div className="mb-3">
              <label htmlFor="payslips" className="form-label">Upload Payslips</label>
              <input
                id="payslips"
                name="payslips"
                type="file"
                className="form-control"
                onChange={(e) => formik.setFieldValue('payslips', e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bankStatement" className="form-label">Upload Bank Statement</label>
              <input
                id="bankStatement"
                name="bankStatement"
                type="file"
                className="form-control"
                onChange={(e) => formik.setFieldValue('bankStatement', e.target.files[0])}
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
              onChange={(e) => formik.setFieldValue('businessCertificate', e.target.files[0])}
            />
          </div>
        )}

        <div className="mt-4 bg-white p-3 rounded">
          <h4>Loan Breakdown</h4>
          <p><strong>Total Interest:</strong> KES {loanBreakdown.totalInterest.toFixed(2)}</p>
          <p><strong>Total Payable:</strong> KES {loanBreakdown.totalPayable.toFixed(2)}</p>
          <p><strong>Weekly Installment:</strong> KES {loanBreakdown.weeklyInstallment.toFixed(2)}</p>
        </div>

        <button type="submit" className="btn btn-primary mt-4 w-100">Submit Application</button>
      </form>
    </div>
  );
};

export default LoanApplication;
