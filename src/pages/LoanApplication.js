// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Tooltip, Button, Modal } from 'react-bootstrap';
// import { AiOutlineInfoCircle } from 'react-icons/ai'; // Add icon for loan type
// import 'bootstrap/dist/css/bootstrap.min.css';

// const LoanApplication = () => {
//   const [searchParams] = useSearchParams();
//   const loanType = searchParams.get('type') || 'salary'; // Default to 'salary' if not specified

//   const [loanBreakdown, setLoanBreakdown] = useState({
//     totalInterest: 0,
//     totalPayable: 0,
//     weeklyInstallment: 0,
//   });

//   const [showModal, setShowModal] = useState(false);

//   // Formik setup for form validation
//   const formik = useFormik({
//     initialValues: {
//       fullName: '',
//       phoneNumber: '',
//       idNumber: '',
//       loanAmount: '',
//       loanDuration: 5, // Default duration in weeks
//       payslips: null,
//       bankStatement: null,
//       businessCertificate: null,
//     },
//     validationSchema: Yup.object({
//       fullName: Yup.string().required('Full name is required'),
//       phoneNumber: Yup.string().required('Phone number is required'),
//       idNumber: Yup.string().required('ID number is required'),
//       loanAmount: Yup.number()
//         .min(500, 'Minimum loan amount is 500 KES')
//         .required('Loan amount is required'),
//       loanDuration: Yup.number()
//         .min(1, 'Minimum duration is 1 week')
//         .max(5, 'Maximum duration is 5 weeks')
//         .required('Loan duration is required'),
//     }),
//     onSubmit: (values) => {
//       console.log('Form Submitted:', values);
//       alert('Your application has been successfully submitted!');
//     },
//   });

//   // Calculate loan breakdown (interest, total repayable, weekly installment)
//   const calculateLoanBreakdown = () => {
//     const amount = parseFloat(formik.values.loanAmount || 0);
//     const duration = parseInt(formik.values.loanDuration || 1, 10);
//     const weeklyInterestRate = 0.05; // 5% weekly interest rate

//     const totalInterest = amount * weeklyInterestRate * duration;
//     const totalPayable = amount + totalInterest;
//     const weeklyInstallment = totalPayable / duration;

//     setLoanBreakdown({ totalInterest, totalPayable, weeklyInstallment });
//   };

//   useEffect(() => {
//     calculateLoanBreakdown(); // Recalculate breakdown when form values change
//   }, [formik.values.loanAmount, formik.values.loanDuration]);

//   // Function to handle document preview
//   const handleFileUpload = (e, fieldName) => {
//     const file = e.target.files[0];
//     formik.setFieldValue(fieldName, file);
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Loan Application</h2>
//       <p>Apply for a {loanType === 'salary' ? 'Salary Loan' : 'Business Loan'}.</p>

//       <form onSubmit={formik.handleSubmit} className="mt-4">
//         {/* Full Name */}
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

//         {/* Phone Number */}
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

//         {/* National ID / Passport */}
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

//         {/* Loan Amount */}
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

//         {/* Loan Duration */}
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

//         {/* Conditional File Uploads */}
//         {loanType === 'salary' && (
//           <>
//             <div className="mb-3">
//               <label htmlFor="payslips" className="form-label">Upload Payslips</label>
//               <input
//                 id="payslips"
//                 name="payslips"
//                 type="file"
//                 className="form-control"
//                 onChange={(e) => handleFileUpload(e, 'payslips')}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="bankStatement" className="form-label">Upload Bank Statement</label>
//               <input
//                 id="bankStatement"
//                 name="bankStatement"
//                 type="file"
//                 className="form-control"
//                 onChange={(e) => handleFileUpload(e, 'bankStatement')}
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
//               onChange={(e) => handleFileUpload(e, 'businessCertificate')}
//             />
//           </div>
//         )}

//         {/* Loan Breakdown */}
//         <h4 className="mt-4">Loan Breakdown</h4>
//         <p><strong>Total Interest:</strong> KES {loanBreakdown.totalInterest.toFixed(2)}</p>
//         <p><strong>Total Payable:</strong> KES {loanBreakdown.totalPayable.toFixed(2)}</p>
//         <p><strong>Weekly Installment:</strong> KES {loanBreakdown.weeklyInstallment.toFixed(2)}</p>

//         {/* Submit Button */}
//         <button type="submit" className="btn btn-primary mt-3">Submit Application</button>

//         {/* Tooltip Info for Loan Type */}
//         <div className="mt-3">
//           <Tooltip placement="top" title="Choose the loan type depending on your application">
//             <AiOutlineInfoCircle size={25} />
//           </Tooltip>
//         </div>
//       </form>

//       {/* Modal for Terms & Conditions */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Loan Terms & Conditions</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>By applying for this loan, you agree to our terms and conditions...</p>
//           {/* Add your actual terms here */}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default LoanApplication;
// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Button, Form, InputGroup } from 'react-bootstrap';
// import { AiOutlineCheckCircle } from 'react-icons/ai';

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
//       loanType: loanType, // Add loanType field for selection.
//       referralCode: '',  // Referral code for "refer a friend"
//       referralSource: '', // Where they heard about us
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

//   useEffect(() => {
//     calculateLoanBreakdown();
//   }, [formik.values.loanAmount, formik.values.loanDuration]);

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

//         <div className="mb-3">
//           <label htmlFor="loanType" className="form-label">Select Loan Type</label>
//           <select
//             id="loanType"
//             name="loanType"
//             className="form-control"
//             onChange={formik.handleChange}
//             value={formik.values.loanType}
//           >
//             <option value="salary">Salary Loan</option>
//             <option value="business">Business Loan</option>
//           </select>
//         </div>

//         {formik.values.loanType === 'salary' && (
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

//         {formik.values.loanType === 'business' && (
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

//         {/* Refer a Friend Section */}
//         <div className="mb-3">
//           <label htmlFor="referralCode" className="form-label">Referral Code (Optional)</label>
//           <input
//             id="referralCode"
//             name="referralCode"
//             type="text"
//             className="form-control"
//             onChange={formik.handleChange}
//             value={formik.values.referralCode}
//           />
//           <small className="form-text text-muted">
//             Refer a friend and receive a 3% reward upon successful application.
//           </small>
//         </div>

//         {/* How did you hear about us Section */}
//         <div className="mb-3">
//           <label htmlFor="referralSource" className="form-label">How did you hear about us?</label>
//           <select
//             id="referralSource"
//             name="referralSource"
//             className="form-control"
//             onChange={formik.handleChange}
//             value={formik.values.referralSource}
//           >
//             <option value="">Select an option</option>
//             <option value="facebook">Facebook</option>
//             <option value="whatsapp">WhatsApp</option>
//             <option value="social_media">Other Social Media</option>
//             <option value="friend">Friend/Referral</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <h4 className="mt-4">Loan Breakdown</h4>
//         <p><strong>Total Interest:</strong> KES {loanBreakdown.totalInterest.toFixed(2)}</p>
//         <p><strong>Total Payable:</strong> KES {loanBreakdown.totalPayable.toFixed(2)}</p>
//         <p><strong>Weekly Installment:</strong> KES {loanBreakdown.weeklyInstallment.toFixed(2)}</p>

//         <Button type="submit" variant="primary" className="mt-3">
//           Submit Application <AiOutlineCheckCircle />
//         </Button>
//       </form>
//     </div>
//   );
// };

// // export default LoanApplication;
// import React, { useState, useEffect } from 'react'; // Ensure these are imported
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Button, Form } from 'react-bootstrap'; // Removed unused imports
// // import { AiOutlineInfoCircle } from 'react-icons/ai'; // Removed since it's not used
// // import { Alert } from 'react-bootstrap'; // Removed since it's not used

// const LoanApplication = () => {
//   const [loanType, setLoanType] = useState('salary'); // Default loan type is salary
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
//       loanDuration: 5, // Default duration in weeks
//       loanType: 'salary',
//       payslips: null,
//       bankStatement: null,
//       businessCertificate: null,
//       referralSource: '',  // New field for how the user found out about the loan
//       referAFriend: false,  // New field for refer a friend offer
//     },
//     validationSchema: Yup.object({
//       fullName: Yup.string().required('Full name is required'),
//       phoneNumber: Yup.string().required('Phone number is required'),
//       idNumber: Yup.string().required('National ID/Passport is required'),
//       loanAmount: Yup.number().min(500, 'Minimum loan amount is 500').required('Loan amount is required'),
//       loanDuration: Yup.number().min(1, 'Duration must be between 1 to 5 weeks').max(5, 'Maximum duration is 5 weeks').required('Loan duration is required'),
//     }),
//     onSubmit: (values) => {
//       console.log('Form Submitted:', values);
//       alert(`Application submitted successfully for a ${values.loanType} loan!`);
//     },
//   });

//   // Calculate loan breakdown
//   useEffect(() => {
//     const calculateLoanBreakdown = () => {
//       const amount = parseFloat(formik.values.loanAmount || 0);
//       const duration = parseInt(formik.values.loanDuration || 1, 10);
//       const weeklyInterestRate = 0.05; // 5% weekly interest rate

//       const totalInterest = amount * weeklyInterestRate * duration;
//       const totalPayable = amount + totalInterest;
//       const weeklyInstallment = totalPayable / duration;

//       setLoanBreakdown({ totalInterest, totalPayable, weeklyInstallment });
//     };

//     calculateLoanBreakdown();
//   }, [formik.values.loanAmount, formik.values.loanDuration]);

//   return (
//     <div className="container mt-5">
//       <h2>Loan Application</h2>
//       <p>Apply for a loan by selecting the loan type below.</p>

//       <Form onSubmit={formik.handleSubmit}>
//         {/* Loan Type Selection */}
//         <Form.Group controlId="loanType">
//           <Form.Label>Select Loan Type</Form.Label>
//           <Form.Check
//             type="radio"
//             label="Salary Loan"
//             name="loanType"
//             value="salary"
//             checked={loanType === 'salary'}
//             onChange={(e) => setLoanType(e.target.value)}
//           />
//           <Form.Check
//             type="radio"
//             label="Business Loan"
//             name="loanType"
//             value="business"
//             checked={loanType === 'business'}
//             onChange={(e) => setLoanType(e.target.value)}
//           />
//         </Form.Group>

//         {/* Full Name */}
//         <Form.Group controlId="fullName">
//           <Form.Label>Full Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter your full name"
//             name="fullName"
//             onChange={formik.handleChange}
//             value={formik.values.fullName}
//           />
//           {formik.errors.fullName && <div className="text-danger">{formik.errors.fullName}</div>}
//         </Form.Group>

//         {/* Phone Number */}
//         <Form.Group controlId="phoneNumber">
//           <Form.Label>Phone Number</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter your phone number"
//             name="phoneNumber"
//             onChange={formik.handleChange}
//             value={formik.values.phoneNumber}
//           />
//           {formik.errors.phoneNumber && <div className="text-danger">{formik.errors.phoneNumber}</div>}
//         </Form.Group>

//         {/* ID Number */}
//         <Form.Group controlId="idNumber">
//           <Form.Label>National ID / Passport</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter your National ID or Passport number"
//             name="idNumber"
//             onChange={formik.handleChange}
//             value={formik.values.idNumber}
//           />
//           {formik.errors.idNumber && <div className="text-danger">{formik.errors.idNumber}</div>}
//         </Form.Group>

//         {/* Loan Amount */}
//         <Form.Group controlId="loanAmount">
//           <Form.Label>Loan Amount</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter loan amount"
//             name="loanAmount"
//             onChange={formik.handleChange}
//             value={formik.values.loanAmount}
//           />
//           {formik.errors.loanAmount && <div className="text-danger">{formik.errors.loanAmount}</div>}
//         </Form.Group>

//         {/* Loan Duration */}
//         <Form.Group controlId="loanDuration">
//           <Form.Label>Loan Duration (in weeks)</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter loan duration"
//             name="loanDuration"
//             onChange={formik.handleChange}
//             value={formik.values.loanDuration}
//           />
//           {formik.errors.loanDuration && <div className="text-danger">{formik.errors.loanDuration}</div>}
//         </Form.Group>

//         {/* Conditional File Uploads */}
//         {loanType === 'salary' && (
//           <>
//             <Form.Group controlId="payslips">
//               <Form.Label>Upload Payslips</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="payslips"
//                 onChange={(e) => formik.setFieldValue('payslips', e.target.files[0])}
//               />
//             </Form.Group>
//             <Form.Group controlId="bankStatement">
//               <Form.Label>Upload Bank Statement</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="bankStatement"
//                 onChange={(e) => formik.setFieldValue('bankStatement', e.target.files[0])}
//               />
//             </Form.Group>
//           </>
//         )}

//         {loanType === 'business' && (
//           <Form.Group controlId="businessCertificate">
//             <Form.Label>Business Registration Certificate</Form.Label>
//             <Form.Control
//               type="file"
//               name="businessCertificate"
//               onChange={(e) => formik.setFieldValue('businessCertificate', e.target.files[0])}
//             />
//           </Form.Group>
//         )}

//         {/* Referral Section */}
//         <Form.Group controlId="referralSource">
//           <Form.Label>How did you hear about us?</Form.Label>
//           <Form.Control
//             as="select"
//             name="referralSource"
//             onChange={formik.handleChange}
//             value={formik.values.referralSource}
//           >
//             <option value="">Select an option</option>
//             <option value="facebook">Facebook</option>
//             <option value="whatsapp">WhatsApp</option>
//             <option value="socialMedia">Social Media</option>
//             <option value="friend">Friend</option>
//             <option value="other">Other</option>
//           </Form.Control>
//         </Form.Group>

//         {/* Refer a Friend Checkbox */}
//         <Form.Group controlId="referAFriend">
//           <Form.Check
//             type="checkbox"
//             label="Refer a friend and get 3% off your loan!"
//             name="referAFriend"
//             onChange={formik.handleChange}
//             checked={formik.values.referAFriend}
//           />
//         </Form.Group>

//         {/* Loan Breakdown */}
//         <h4 className="mt-4">Loan Breakdown</h4>
//         <p><strong>Total Interest:</strong> KES {loanBreakdown.totalInterest.toFixed(2)}</p>
//         <p><strong>Total Payable:</strong> KES {loanBreakdown.totalPayable.toFixed(2)}</p>
//         <p><strong>Weekly Installment:</strong> KES {loanBreakdown.weeklyInstallment.toFixed(2)}</p>

//         {/* Submit Button */}
//         <Button variant="primary" type="submit" className="mt-3">
//           Submit Application
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default LoanApplication;
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Alert } from 'react-bootstrap';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const LoanApplication = () => {
  const [loanType, setLoanType] = useState('salary'); // Default loan type is salary
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
      loanDuration: 5, // Default duration in weeks
      loanType: 'salary',
      payslips: null,
      bankStatement: null,
      businessCertificate: null,
      referralSource: '',  // New field for how the user found out about the loan
      referAFriend: false,  // New field for refer a friend offer
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      phoneNumber: Yup.string().required('Phone number is required'),
      idNumber: Yup.string().required('National ID/Passport is required'),
      loanAmount: Yup.number().min(500, 'Minimum loan amount is 500').required('Loan amount is required'),
      loanDuration: Yup.number().min(1, 'Duration must be between 1 to 5 weeks').max(5, 'Maximum duration is 5 weeks').required('Loan duration is required'),
    }),
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
      alert(`Application submitted successfully for a ${values.loanType} loan!`);
    },
  });

  // Calculate loan breakdown
  useEffect(() => {
    const calculateLoanBreakdown = () => {
      const amount = parseFloat(formik.values.loanAmount || 0);
      const duration = parseInt(formik.values.loanDuration || 1, 10);
      const weeklyInterestRate = 0.05; // 5% weekly interest rate

      const totalInterest = amount * weeklyInterestRate * duration;
      const totalPayable = amount + totalInterest;
      const weeklyInstallment = totalPayable / duration;

      setLoanBreakdown({ totalInterest, totalPayable, weeklyInstallment });
    };

    calculateLoanBreakdown();
  }, [formik.values.loanAmount, formik.values.loanDuration]);

  return (
    <div className="container mt-5">
      <h2>Loan Application</h2>
      <p>Apply for a loan by selecting the loan type below.</p>

      <Form onSubmit={formik.handleSubmit}>
        {/* Loan Type Selection */}
        <Form.Group controlId="loanType">
          <Form.Label>Select Loan Type</Form.Label>
          <Form.Check
            type="radio"
            label="Salary Loan"
            name="loanType"
            value="salary"
            checked={loanType === 'salary'}
            onChange={(e) => setLoanType(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Business Loan"
            name="loanType"
            value="business"
            checked={loanType === 'business'}
            onChange={(e) => setLoanType(e.target.value)}
          />
        </Form.Group>

        {/* Full Name */}
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

        {/* Phone Number */}
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

        {/* ID Number */}
        <Form.Group controlId="idNumber">
          <Form.Label>National ID / Passport</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your National ID or Passport number"
            name="idNumber"
            onChange={formik.handleChange}
            value={formik.values.idNumber}
          />
          {formik.errors.idNumber && <div className="text-danger">{formik.errors.idNumber}</div>}
        </Form.Group>

        {/* Loan Amount */}
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

        {/* Loan Duration */}
        <Form.Group controlId="loanDuration">
          <Form.Label>Loan Duration (in weeks)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter loan duration"
            name="loanDuration"
            onChange={formik.handleChange}
            value={formik.values.loanDuration}
          />
          {formik.errors.loanDuration && <div className="text-danger">{formik.errors.loanDuration}</div>}
        </Form.Group>

        {/* Conditional File Uploads */}
        {loanType === 'salary' && (
          <>
            <Form.Group controlId="payslips">
              <Form.Label>Upload Payslips</Form.Label>
              <Form.Control
                type="file"
                name="payslips"
                onChange={(e) => formik.setFieldValue('payslips', e.target.files[0])}
              />
            </Form.Group>
            <Form.Group controlId="bankStatement">
              <Form.Label>Upload Bank Statement</Form.Label>
              <Form.Control
                type="file"
                name="bankStatement"
                onChange={(e) => formik.setFieldValue('bankStatement', e.target.files[0])}
              />
            </Form.Group>
          </>
        )}

        {loanType === 'business' && (
          <Form.Group controlId="businessCertificate">
            <Form.Label>Business Registration Certificate</Form.Label>
            <Form.Control
              type="file"
              name="businessCertificate"
              onChange={(e) => formik.setFieldValue('businessCertificate', e.target.files[0])}
            />
          </Form.Group>
        )}

        {/* Referral Section */}
        <Form.Group controlId="referralSource">
          <Form.Label>How did you hear about us?</Form.Label>
          <Form.Control
            as="select"
            name="referralSource"
            onChange={formik.handleChange}
            value={formik.values.referralSource}
          >
            <option value="">Select an option</option>
            <option value="facebook">Facebook</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="socialMedia">Social Media</option>
            <option value="friend">Friend</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>

        {/* Refer a Friend Checkbox */}
        <Form.Group controlId="referAFriend">
          <Form.Check
            type="checkbox"
            label="Refer a friend and get 3% off your loan!"
            name="referAFriend"
            onChange={formik.handleChange}
            checked={formik.values.referAFriend}
          />
        </Form.Group>

        {/* Loan Breakdown */}
        <h4 className="mt-4">Loan Breakdown</h4>
        <p><strong>Total Interest:</strong> KES {loanBreakdown.totalInterest.toFixed(2)}</p>
        <p><strong>Total Payable:</strong> KES {loanBreakdown.totalPayable.toFixed(2)}</p>
        <p><strong>Weekly Installment:</strong> KES {loanBreakdown.weeklyInstallment.toFixed(2)}</p>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="mt-3">
          Submit Application
        </Button>
      </Form>
    </div>
  );
};

export default LoanApplication;
