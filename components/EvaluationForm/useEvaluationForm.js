import { useState } from "react";
import { addEvaluation } from "@/functions/api";

const initialFormState = {
  student_idil: "",
  first_name: "",
  last_name: "",
  gender: "",
  date_of_birth: "",
  age_at_evaluation: null,
  class: "",
  school_name: "",
  city: "",
  neighborhood: "",
  special_education_status: false,
  iep_exists: false,
  main_disability: "",
  secondary_disability: "",
  current_programs: [],
  years_in_programs: null,
  socioeconomic_status: null,
  number_of_siblings: null,
  evaluation_date: new Date().toISOString().split("T")[0],
  year: new Date().getFullYear(),
  phase: 1,
  social_competence_1: 1,
  social_competence_2: 1,
  social_competence_3: 1,
  emotional_regulation_1: 1,
  emotional_regulation_2: 1,
  emotional_regulation_3: 1,
  learning_motivation_1: 1,
  learning_motivation_2: 1,
  learning_motivation_3: 1,
  cognitive_skills_1: 1,
  cognitive_skills_2: 1,
  cognitive_skills_3: 1,
  additional_comments: "",
  evaluator_name: "",
  evaluator_role: "",
};

export function useEvaluationForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      await addEvaluation(formData);
      setSubmitSuccess("ההערכה נשלחה בהצלחה");
      setFormData(initialFormState); // איפוס הטופס למצב ההתחלתי
    } catch (error) {
      setSubmitError("שגיאה בשליחת ההערכה: " + error.message);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    submitError,
    submitSuccess,
    setFormData: updateFormData,
  };
}
