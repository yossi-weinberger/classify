"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useStudents } from "./useStudents";
import { useEvaluationForm } from "./useEvaluationForm";
import StudentSelector from "./StudentSelector";
import PersonalInfoSection from "./PersonalInfoSection";
import EducationInfoSection from "./EducationInfoSection";
import EvaluationSection from "./EvaluationSection";
import styles from "./EvaluationForm.module.css";
import { useSortContext } from "@/providers/SortProvider";
import Loading from "../loading/loading";

export default function EvaluationForm() {
  const [selectedClassId, setSelectedClassId] = useState("");
  const { classes, students, loading, error } = useStudents(selectedClassId);
  const { sortItems } = useSortContext();
  const {
    formData,
    handleChange,
    handleSubmit,
    submitError,
    submitSuccess,
    setFormData,
  } = useEvaluationForm();

  const handleStudentSelect = useCallback(
    (student) => {
      if (student) {
        setFormData({
          ...formData,
          student_idil: student.idil,
          first_name: student.firstName,
          last_name: student.lastName,
          full_name: student.fullName,
          gender: student.gender,
          date_of_birth: student.dateOfBirth,
          class: student.class,
          school_name: student.school,
          city: student.address?.city || "",
          neighborhood: student.address?.neighborhood || "",
          special_education_status: student.specialEducationStatus || false,
          main_disability: student.mainDisability || "",
          secondary_disability: student.secondaryDisability || "",
          image_url: student.img || "",
          // ... כל שאר השדות הרלוונטיים
        });
      } else {
        setFormData({}); // איפוס הטופס אם לא נבחר תלמיד
      }
    },
    [setFormData]
  );

  const sortedClasses = useMemo(() => {
    return sortItems(classes, "className");
  }, [classes, sortItems]);

  const sortedStudents = useMemo(() => {
    return sortItems(students, "firstName");
  }, [students, sortItems]);

  useEffect(() => {
    if (submitSuccess) {
      setSelectedClassId("");
    }
  }, [submitSuccess]);

  if (loading) return <Loading />;
  if (error) return <div>שגיאה: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <StudentSelector
        classes={sortedClasses}
        students={sortedStudents}
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
