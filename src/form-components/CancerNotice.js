import React, { useState } from 'react';

const CancerNotice = ({ patients }) => {
    const [selectedPatientId, setSelectedPatientId] = useState('');

    const handlePatientChange = (event) => {
        setSelectedPatientId(event.target.value);
    };

    const patient = patients.find(p => p.id === parseInt(selectedPatientId));

    if (!patient) {
        return (
            <div>
                <select onChange={handlePatientChange} value={selectedPatientId}>
                    <option value="">Select a Patient</option>
                    {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>{patient.name}</option>
                    ))}
                </select>
                <div>Välj en patient för att se detaljer.</div>
            </div>
        );
    }

    const findHighestECOG = () => {
        const allECOGs = patient.followUps.map(followUp => Number(followUp.ecog))
            .filter(ecog => !isNaN(ecog));

        console.log("All ECOGs (filtered):", allECOGs);
        return allECOGs.length > 0 ? Math.max(...allECOGs) : "No valid ECOG scores available";
    };

    const highestECOG = findHighestECOG();

    const latestDiagnosisDate = patient.diagnoses.reduce((latest, current) => {
        return new Date(latest.diagnosisDate) > new Date(current.diagnosisDate) ? latest : current;
    }, patient.diagnoses[0]).diagnosisDate;

    return (
        <div>
            <select onChange={handlePatientChange} value={selectedPatientId}>
                <option value="">Select a Patient</option>
                {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
            </select>
            <h2>Canceranmälan för: {patient.name}</h2>
            <p>Senaste diagnosdatum: {latestDiagnosisDate}</p>
            <p>Högsta ECOG: {highestECOG}</p> 
        </div>
    );
};

export default CancerNotice;





