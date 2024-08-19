"use client";
import { useState } from "react";
import { useStudents } from "./useStudents";
import { useEvaluationForm } from "./useEvaluationForm";
import StudentSelector from "./StudentSelector";
import PersonalInfoSection from "./PersonalInfoSection";
import EducationInfoSection from "./EducationInfoSection";
import EvaluationSection from "./EvaluationSection";
import styles from "./EvaluationForm.module.css";

export default function EvaluationForm() {
  console.log("Rendering EvaluationForm");
  const [selectedClassId, setSelectedClassId] = useState("");
  const { classes, students, loading, error } = useStudents(selectedClassId);
  const {
    formData,
    handleChange,
    handleSubmit,
    submitError,
    submitSuccess,
    setFormData,
  } = useEvaluationForm();

  console.log("Classes:", classes);
  console.log("Loading:", loading);
  console.log("Error:", error);

  const handleStudentSelect = (student) => {
    if (student) {
      setFormData({
        ...formData,
        student_idil: student.idil,
        first_name: student.firstName,
        last_name: student.lastName,
        gender: student.gender || "",
        date_of_birth: student.dateOfBirth,
        class: student.class,
        school_name: student.school,
        city: student.address?.city || "",
        neighborhood: student.address?.neighborhood || "",
        special_education_status: student.specialEducationStatus || false,
        main_disability: student.mainDisability || "",
        secondary_disability: student.secondaryDisability || "",
        // ... כל שאר השדות הרלוונטיים
      });
    }
  };

  if (loading) return <div>טוען...</div>;
  if (error) return <div>שגיאה: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {submitError && <div className={styles.error}>{submitError}</div>}
      {submitSuccess && <div className={styles.success}>{submitSuccess}</div>}

      <StudentSelector
        classes={classes}
        students={students}
        selectedClassId={selectedClassId}
        setSelectedClassId={setSelectedClassId}
        onStudentSelect={handleStudentSelect}
      />

      <PersonalInfoSection formData={formData} handleChange={handleChange} />
      <EducationInfoSection formData={formData} handleChange={handleChange} />
      <EvaluationSection formData={formData} handleChange={handleChange} />

      {submitError && <div className={styles.error}>{submitError}</div>}
      {submitSuccess && <div className={styles.success}>{submitSuccess}</div>}

      <button type="submit" className={styles.submitButton}>
        שלח הערכה
      </button>
    </form>
  );
}