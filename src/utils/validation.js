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
    return ecog >= 0 && ecog <= 5;
};