
import React, { useState } from 'react';
import { isValidDiagnosisDate } from '../utils/validation'; 

const Diagnoses = ({ patients, setPatients }) => {
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [diagnosis, setDiagnosis] = useState({
        diagnosisDate: '',
        basis: ''
    });
    const [dateValid, setDateValid] = useState(true); 

    const handlePatientChange = (e) => {
        setSelectedPatientId(e.target.value);
    };

    const handleDiagnosisChange = (e) => {
        const { name, value } = e.target;
        setDiagnosis(prev => ({ ...prev, [name]: value }));
        if (name === 'diagnosisDate') {
            setDateValid(isValidDiagnosisDate(value)); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Input diagnosis date:", diagnosis.diagnosisDate); 
        if (isValidDiagnosisDate(diagnosis.diagnosisDate)) {
            const updatedPatients = patients.map(patient =>
                patient.id === parseInt(selectedPatientId) ? {
                    ...patient,
                    diagnoses: [...(patient.diagnoses || []), { ...diagnosis, diagnosisId: (patient.diagnoses?.length || 0) + 1 }]
                } : patient
            );
            setPatients(updatedPatients);
            setDiagnosis({ diagnosisDate: '', basis: '' }); 
            console.log("Updated patients after diagnosis added:", updatedPatients);
        } else {
            console.error("Invalid diagnosis date.");
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Välj patient:
                <select value={selectedPatientId} onChange={handlePatientChange}>
            <option value="">Välj en Patient</option>
            {patients && patients.map(patient => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
            </label>
            <label>
                Diagnosdatum:
                <input type="date" name="diagnosisDate" value={diagnosis.diagnosisDate} onChange={handleDiagnosisChange} />
                {!dateValid && <p className="error-message">Ogiltigt Diagnosdatum.</p>}  
            </label>
            <label>
                Grund för diagnos:
                <select name="basis" value={diagnosis.basis} onChange={handleDiagnosisChange}>
                    <option value="">Välj</option>
                    <option value="PAD">PAD</option>
                    <option value="cytology">Cytology</option>
                    <option value="X-ray">X-ray</option>
                    <option value="clinical examination">Clinical Examination</option>
                </select>
            </label>
            <button type="submit">Lägg till Diagnosis</button>
        </form>
    );
};

export default Diagnoses;
