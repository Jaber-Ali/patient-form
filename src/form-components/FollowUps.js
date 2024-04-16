import React, { useState } from 'react';
import { isValidECOG } from '../utils/validation';


const FollowUps = ({ patients, setPatients }) => {
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [followUp, setFollowUp] = useState({
    followUpDate: '',
    ecog: ''
  });

  const handlePatientChange = (e) => {
    setSelectedPatientId(e.target.value);
  };

  const handleFollowUpChange = (e) => {
    const { name, value } = e.target;
    setFollowUp(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ecogAsNumber = Number(followUp.ecog);


    if (!isNaN(ecogAsNumber) && isValidECOG(ecogAsNumber)) {
      const updatedPatients = patients.map(patient =>
        patient.id === parseInt(selectedPatientId) ? {
          ...patient,
          followUps: [
            ...(patient.followUps || []),
            { ...followUp, ecog: ecogAsNumber, followUpId: (patient.followUps?.length || 0) + 1 }
          ]
        } : patient
      );
      setPatients(updatedPatients);
      setFollowUp({ followUpDate: '', ecog: '' });
      console.log("Follow-Ups updated:", updatedPatients);
    } else {
      console.error("Invalid ECOG score provided.");
    }
  };
  const isFollowUpValid = () => {
    if (followUp.ecog === '' || followUp.followUpDate === '') {
      return false;
    }
    const ecogAsNumber = Number(followUp.ecog);
    return isValidECOG(ecogAsNumber);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
         Välj patient:
        <select value={selectedPatientId} onChange={handlePatientChange}>
          <option value="">Välj Patient</option>
          {patients && patients.map(patient => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>
      </label>
      <label>
        Uppföljnings-datum:
        <input type="date" name="followUpDate" value={followUp.followUpDate} onChange={handleFollowUpChange} />
      </label>
      <label>
        ECOG:
        <input type="number" name="ecog" value={followUp.ecog} onChange={handleFollowUpChange} />
        {!isValidECOG(Number(followUp.ecog)) && <p className="error-message">Ogiltigt ECOG-poäng. Ange ett giltigt ECOG-poäng mellan 0 och 5.</p>}
      </label>
      <button type="submit" disabled={!isFollowUpValid()}>Lägg till</button>
    </form>
  );
};

export default FollowUps;
