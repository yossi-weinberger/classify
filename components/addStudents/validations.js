// validations.js

export const validateIdil = (idil) => {
  return /^\d{9}$/.test(idil) ? null : "מספר זהות חייב להכיל 9 ספרות";
};

export const validateHebrewName = (name) => {
  return /^[\u0590-\u05FF\s]{2,}$/.test(name)
    ? null
    : "השם חייב להכיל לפחות 2 תווים בעברית";
};

export const validateDateOfBirth = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  return birthDate > new Date() ? "תאריך הלידה לא יכול להיות בעתיד" : null;
};

export const validatePhoneNumber = (phone) => {
  return /^05\d{8}$/.test(phone) ? null : "מספר טלפון לא תקין";
};

export const validatePostalCode = (postalCode) => {
  return /^\d{7}$/.test(postalCode) ? null : "מיקוד חייב להכיל 7 ספרות";
};

export const validateForm = (formData) => {
  let errors = {};

  const idilError = validateIdil(formData.idil);
  if (idilError) errors.idil = idilError;

  const firstNameError = validateHebrewName(formData.firstName);
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateHebrewName(formData.lastName);
  if (lastNameError) errors.lastName = lastNameError;

  const dateOfBirthError = validateDateOfBirth(formData.dateOfBirth);
  if (dateOfBirthError) errors.dateOfBirth = dateOfBirthError;

  if (formData.fatherPhone) {
    const fatherPhoneError = validatePhoneNumber(formData.fatherPhone);
    if (fatherPhoneError) errors.fatherPhone = fatherPhoneError;
  }

  if (formData.motherPhone) {
    const motherPhoneError = validatePhoneNumber(formData.motherPhone);
    if (motherPhoneError) errors.motherPhone = motherPhoneError;
  }

  if (formData.address.postalCode) {
    const postalCodeError = validatePostalCode(formData.address.postalCode);
    if (postalCodeError) errors.postalCode = postalCodeError;
  }

  return errors;
};
