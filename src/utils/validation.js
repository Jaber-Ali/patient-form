export const validateOperationCode = (code) => {
    return /^[A-Z]{2}\d{4}$/.test(code);
};

export const isValidDiagnosisDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputDate = new Date(date);
    return inputDate <= today;
};

export const isValidECOG = (ecog) => {
    if (isNaN(ecog) || ecog === '') {
        return false;
    }
    return ecog >= 0 && ecog <= 5;
};


export const isValidBirthdate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const inputDate = new Date(date);
    return inputDate < today;
};

export const isValidName = (name) => {
    if (!name) {
        return false;
    }
    if (!isNaN(name)) {
        return false;
    }
    const nameRegex = /^[a-zA-ZåäöÅÄÖ\s]+$/;
    return nameRegex.test(name);
};
