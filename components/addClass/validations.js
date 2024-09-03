export const validateClassName = (className) => {
  return /^[\u0590-\u05FF]{1,2}$/.test(className)
    ? null
    : "שם הכיתה חייב להכיל עד 2 תווים בעברית";
};

export const validateTeacherName = (teacherName) => {
  return /^[\u0590-\u05FF\s]{2,}(\s[\u0590-\u05FF\s]{2,})+$/.test(teacherName)
    ? null
    : "שם המורה חייב להכיל שם פרטי ושם משפחה";
};

export const validateForm = (formData) => {
  let errors = {};

  const classNameError = validateClassName(formData.className);
  if (classNameError) errors.className = classNameError;

  const teacherNameError = validateTeacherName(formData.teacher);
  if (teacherNameError) errors.teacher = teacherNameError;

  return errors;
};
