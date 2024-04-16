import React, { useState } from 'react';
import { isValidBirthdate, isValidName   } from '../utils/validation';

const Patient = ({ addPatient }) => {
    const [newPatient, setNewPatient] = useState({
        name: '',
        birthdate: '',
        gender: ''
    });
    const [isBirthdateValid, setIsBirthdateValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewPatient(prev => ({ ...prev, [name]: value }));
      if (name === 'birthdate') {
          setIsBirthdateValid(isValidBirthdate(value));
        } else if (name === 'name') {
          setIsNameValid(isValidName(value));
      }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isBirthdateValid || !isNameValid) {
        console.error("Invalid birthdate.");
        return;
    }
    addPatient(newPatient);
    setNewPatient({ name: '', birthdate: '', gender: '' }); 
    console.log("Updated Patients List:", newPatient);
};

const isPatientInfoValid = () => {
  
  if (newPatient.name === '' || newPatient.birthdate === '' || newPatient.gender === '') {
      return false;
  }

  return isValidName(newPatient.name) && isValidBirthdate(newPatient.birthdate);
};

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Patientens fullständiga namn:
                <input type="text" name="name" value={newPatient.name} onChange={handleChange} />
                {!isNameValid && <p className="error-message">Ogiltigt namn. Var snäll och skriv ett giltigt namn.</p>}
            </label>
            <label>
             Födelsedatum:
                <input type="date" name="birthdate" value={newPatient.birthdate} onChange={handleChange} />
                {!isBirthdateValid && <p className="error-message">ogiltigt födelsedatum. Ange ett giltigt födelsedatum.</p>}
            </label>
            <label>
                Kön:
                <select name="gender" value={newPatient.gender} onChange={handleChange}>
                    <option value="">välj</option>
                    <option value="Male">Man</option>
                    <option value="Female">Kvinna</option>
                </select>
            </label>
            <button type="submit" disabled={!isPatientInfoValid()}>Lägg till Patient</button>
        </form>
    );
};

export default Patient;
