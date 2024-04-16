
// import React from 'react';
// import { validateOperationCode } from '../utils/validation'; 

// const SurgeryDetails = ({ surgeryDetails, setSurgeryDetails }) => {
//     const handleSurgeryDetailChange = (index, field, value) => {
//         const newDetails = [...surgeryDetails];
//         newDetails[index][field] = value;
//         setSurgeryDetails(newDetails);
//     };

//     return (
//         <div>
//             {surgeryDetails.map((detail, index) => (
//                 <div key={index}>
//                     <label>
//                         Operation Code:
//                         <input
//                             type="text"
//                             name="operationCode"
//                             value={detail.operationCode}
//                             onChange={(e) => handleSurgeryDetailChange(index, e.target.name, e.target.value)}
//                         />
//                     </label>
//                     {!validateOperationCode(detail.operationCode) && <p className="error-message">Invalid operation code format.</p>}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default SurgeryDetails;
