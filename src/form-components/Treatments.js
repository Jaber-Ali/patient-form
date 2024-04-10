import React from 'react';
import SurgeryDetails from './SurgeryDetails';

const Treatments = ({ treatments, setTreatments }) => {
 const handleTreatmentChange = (index, field, value) => {
    const newTreatments = [...treatments];
    newTreatments[index][field] = value;
    setTreatments(newTreatments);
 };

 return (
    <div>
      {treatments.map((treatment, index) => (
        <div key={index}>
          <label>
            Treatment Date:
            <input type="date" name="treatmentDate" value={treatment.treatmentDate} onChange={(e) => handleTreatmentChange(index, e.target.name, e.target.value)} />
          </label>
          <label>
            Treatment Type:
            <select name="treatmentType" value={treatment.treatmentType} onChange={(e) => handleTreatmentChange(index, e.target.name, e.target.value)}>
              <option value="surgery">Surgery</option>
              <option value="radiotherapy">Radiotherapy</option>
              <option value="chemotherapy">Chemotherapy</option>
            </select>
          </label>
          <SurgeryDetails surgeryDetails={treatment.surgeryDetails} setSurgeryDetails={(newDetails) => handleTreatmentChange(index, 'surgeryDetails', newDetails)} />
        </div>
      ))}
    </div>
 );
};

export default Treatments;
