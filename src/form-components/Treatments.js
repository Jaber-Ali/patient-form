import React, { useState } from 'react';
import { validateOperationCode } from '../utils/validation';

const Treatments = ({ patients, setPatients }) => {
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [treatment, setTreatment] = useState({
    treatmentDate: '',
    treatmentType: '',
    operations: []
  });
  const [operationCode, setOperationCode] = useState('');
  const [isOperationCodeValid, setIsOperationCodeValid] = useState(true);

  const handlePatientChange = (e) => {
    setSelectedPatientId(e.target.value);
  };

  const handleTreatmentChange = (e) => {
    const { name, value } = e.target;
    setTreatment(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOperation = () => {
    if (validateOperationCode(operationCode)) {
      setTreatment(prev => ({
        ...prev,
        operations: [...prev.operations, { operationId: prev.operations.length + 1, operationCode }]
      }));
      setOperationCode('');
      setIsOperationCodeValid(true); 
    } else {
      console.error("Invalid operation code format.");
      setIsOperationCodeValid(false); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patients || !selectedPatientId) {
      console.error("No patients available or no patient selected.");
      return;
    }
    const updatedPatients = (patients || []).map(patient => 
      patient.id === parseInt(selectedPatientId) ? {
        ...patient,
        treatments: [...(patient.treatments || []), { ...treatment, treatmentId: (patient.treatments?.length || 0) + 1 }]
      } : patient
    );
    setPatients(updatedPatients);
    setTreatment({ treatmentDate: '', treatmentType: '', operations: [] }); 
    console.log("Updated treatments Added:", updatedPatients);
  };

  const isTreatmentValid = () => {
    return treatment.treatmentDate && treatment.treatmentType && isOperationCodeValid;
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
         Välj patient:
        <select value={selectedPatientId} onChange={handlePatientChange}>
          <option value="">Välj</option>
          {patients && patients.map(patient => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>

      </label>
      <label>
       Behandlings-Datum:
        <input type="date" name="treatmentDate" value={treatment.treatmentDate} onChange={handleTreatmentChange} />
      </label>
      <label>
         Behandlings-Typ:
        <select name="treatmentType" value={treatment.treatmentType} onChange={handleTreatmentChange}>
          <option value="">Välj</option>
          <option value="surgery">Surgery</option>
          <option value="radiotherapy">Radiotherapy</option>
          <option value="chemotherapy">Chemotherapy</option>
        </select>
      </label>
      {treatment.treatmentType === 'surgery' && (
        <div>
          <label>
            Operation Code:
            <input type="text" value={operationCode} onChange={(e) => {
              setOperationCode(e.target.value);
              setIsOperationCodeValid(validateOperationCode(e.target.value)); 
            }} />
          </label>
          {!isOperationCodeValid && <p className="error-message">Ogiltigt operation code format. Måste bestå av två bokstäver A-Z följt av fyra siffror, till exempel "AB1234".</p>}
          <button type="button" onClick={handleAddOperation} disabled={!isOperationCodeValid}
          >Spara Operation</button>
        </div>
      )}
      <br></br>
      <button type="submit" disabled={!isTreatmentValid()}>Lägg till behandling</button>
    </form>
  );
};

export default Treatments;
