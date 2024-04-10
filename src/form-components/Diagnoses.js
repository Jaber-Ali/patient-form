import React from 'react';
import { isValidDiagnosisDate } from '../utils/validation'; 

const Diagnoses = ({ diagnoses, setDiagnoses }) => {
    const handleDiagnosisChange = (index, field, value) => {
        if (field === "diagnosisDate" && !isValidDiagnosisDate(value)) {
            console.error("Invalid diagnosis date.");
            return; 
        }

        const newDiagnoses = [...diagnoses];
        newDiagnoses[index][field] = value;
        setDiagnoses(newDiagnoses);
    };

    return (
        <div>
            {diagnoses.map((diagnosis, index) => (
                <div key={index}>
                    <label>
                        Diagnosis Date:
                        <input
                            type="date"
                            name="diagnosisDate"
                            value={diagnosis.diagnosisDate}
                            onChange={(e) => handleDiagnosisChange(index, e.target.name, e.target.value)}
                        />
                    </label>
                    <label>
                        Basis For Diagnosis:
                        <select
                            name="basisForDiagnosis"
                            value={diagnosis.basisForDiagnosis}
                            onChange={(e) => handleDiagnosisChange(index, e.target.name, e.target.value)}
                        >
                            <option value="PAD">PAD</option>
                            <option value="cytology">Cytology</option>
                            <option value="X-ray">X-ray</option>
                            <option value="clinical examination">Clinical Examination</option>
                        </select>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default Diagnoses;
