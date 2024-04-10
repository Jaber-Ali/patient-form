import React from 'react';

const Patient = ({ patient, setPatient }) => {
 const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
 };

 return (
    <div>
      <label>
      Patient Name:
        <input type="text" name="name" value={patient.name} onChange={handleChange} />
      </label>
      <label>
        General Condition (ECOG):
        <input type="number" name="generalCondition" value={patient.generalCondition} onChange={handleChange} />
      </label>
    </div>
 );
};

export default Patient;
