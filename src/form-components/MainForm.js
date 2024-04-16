import React, { useState } from 'react';
import Patient from './Patient';
import Diagnoses from './Diagnoses';
import Treatments from './Treatments';
import FollowUps from './FollowUps';
import CancerNotice from './CancerNotice';
import { convertToXML } from '../utils/convertToXML';
import './css/MainForm.css'; 

const MainForm = () => {
    const [data, setData] = useState({
        patients: []
    });
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [activeTab, setActiveTab] = useState('patient');

    const handleAddPatient = (newPatient) => {
      const newPatients = [
          ...data.patients,
          { ...newPatient, id: data.patients.length + 1 }
      ];
      setData({ ...data, patients: newPatients });
  };
  



  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form Data before XML conversion:', data);

    try {
      const xmlData = convertToXML(data);
      console.log('XML Data:', xmlData);

      window.inca = xmlData;
      console.log('Data submitted to window.inca:', window.inca);
      console.log('Data submitted to window.inca in JSON format:', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error converting form data to XML:", error);
    }
  };
    return (
        <div className="main-form">
            <div className="tabs">
                <button onClick={() => setActiveTab('patient')} className={activeTab === 'patient' ? 'active' : ''}>Patient</button>
                <button onClick={() => setActiveTab('diagnoses')} className={activeTab === 'diagnoses' ? 'active' : ''}>Diagnoser</button>
                <button onClick={() => setActiveTab('treatments')} className={activeTab === 'treatments' ? 'active' : ''}>Behandlingar</button>
                <button onClick={() => setActiveTab('followUps')} className={activeTab === 'followUps' ? 'active' : ''}>Följ upp</button>
                <button onClick={() => setActiveTab('CancerNotice')} className={activeTab === 'CancerNotice' ? 'active' : ''}>Canceranmälan</button>
            </div>
            <div className="tab-content">
                {activeTab === 'patient' && <Patient addPatient={handleAddPatient} />}
                {activeTab === 'diagnoses' && <Diagnoses patients={data.patients} setPatients={(newList) => setData({...data, patients: newList})} />}
                {activeTab === 'treatments' &&  <Treatments patients={data.patients} setPatients={(newList) => setData({...data, patients: newList})} />}
                {activeTab === 'followUps' && <FollowUps patients={data.patients} setPatients={(newList) => setData({...data, patients: newList})} />}
                {activeTab === 'CancerNotice' && <CancerNotice patients={data.patients} patientId={selectedPatientId} />}

            </div>
            {activeTab !== 'CancerNotice' && <button onClick={handleSubmit} type="button"  className="submit-btn">Spara</button>}
        </div>
    );
};

export default MainForm;
