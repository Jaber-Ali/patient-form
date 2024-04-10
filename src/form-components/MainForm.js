import React, { useState } from 'react';
import Patient from './Patient';
import Diagnoses from './Diagnoses';
import Treatments from './Treatments';
import FollowUps from './FollowUps';
import { convertToXML } from '../utils/convertToXML';
import './css/MainForm.css'; 

const MainForm = () => {
 const [patient, setPatient] = useState({ name: '', generalCondition: '' });
 const [diagnoses, setDiagnoses] = useState([{ diagnosisDate: '', basisForDiagnosis: '' }]);
 const [treatments, setTreatments] = useState([{ treatmentDate: '', treatmentType: '', surgeryDetails: [{ operationCode: '' }] }]);
 const [followUps, setFollowUps] = useState([{ followUpDate: '', ECOG: '' }]);
 const [activeTab, setActiveTab] = useState('patient'); 

 const findHighestECOG = () => {
    const allECOGs = [patient.generalCondition, ...followUps.map(followUp => followUp.ECOG)];
    return Math.max(...allECOGs);
 };

 const handleSubmit = (e) => {
  e.preventDefault();

  const formData = { patient, diagnoses, treatments, followUps };
  console.log('Form Data:', formData);

  try {
    const xmlData = convertToXML(formData);
    console.log(xmlData); 
  } catch (error) {
    console.error("Error converting form data to XML:", error);
  }

  window.inca = formData;
};

 return (
    <form onSubmit={handleSubmit}>
      <div className="tabs">
        <button className={`tab ${activeTab === 'patient' ? 'active' : ''}`} onClick={() => setActiveTab('patient')}>Patient</button>
        <button className={`tab ${activeTab === 'diagnoses' ? 'active' : ''}`} onClick={() => setActiveTab('diagnoses')}>Diagnoser</button>
        <button className={`tab ${activeTab === 'treatments' ? 'active' : ''}`} onClick={() => setActiveTab('treatments')}>Behandlingar</button>
        <button className={`tab ${activeTab === 'followUps' ? 'active' : ''}`} onClick={() => setActiveTab('followUps')}>Följ upp</button>
      </div>
      <div className="tab-content">
        {activeTab === 'patient' && (
          <div>
            <h2>Patient Notification</h2>
            <p>Diagnosis Date: {diagnoses[0]?.diagnosisDate || 'N/A'}</p>
            <p>Highest ECOG: {findHighestECOG()}</p>
            <Patient patient={patient} setPatient={setPatient} />
          </div>
        )}
        {activeTab === 'diagnoses' && <Diagnoses diagnoses={diagnoses} setDiagnoses={setDiagnoses} />}
        {activeTab === 'treatments' && <Treatments treatments={treatments} setTreatments={setTreatments} />}
        {activeTab === 'followUps' && <FollowUps followUps={followUps} setFollowUps={setFollowUps} />}
      </div>
      <button type="submit">Spara</button>
    </form>
 );
};

export default MainForm;
