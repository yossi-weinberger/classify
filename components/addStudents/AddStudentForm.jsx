"use client";
import { useState } from "react";
import styles from "./AddStudentForm.module.css";
import { addStudent } from "@/functions/apiCalls";

export default function AddStudentForm() {
  const [formData, setFormData] = useState({
    idil: "",
    firstName: "",
    lastName: "",
    class: "",
    dateOfBirth: "",
    fatherName: "",
    motherName: "",
    fatherPhone: "",
    motherPhone: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
    },
    personalNotes: "",
    img: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      // טיפול בשדות מקוננים (כתובת)
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      // טיפול בשדות רגילים
      setFormData((prev) => ({
        ...prev,
        [name]: name === "idil" ? (value === "" ? "" : Number(value)) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addStudent({
        ...formData,
        idil: Number(formData.idil),
      });
      setSuccess(
        `התלמיד ${formData.firstName} ${formData.lastName} נוסף בהצלחה!`
      );
      setFormData({
        idil: "",
        firstName: "",
        lastName: "",
        class: "",
        dateOfBirth: "",
        fatherName: "",
        motherName: "",
        fatherPhone: "",
        motherPhone: "",
        address: {
          street: "",
          city: "",
          postalCode: "",
        },
        personalNotes: "",
        img: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      setError(error.message || "An error occurred while adding the student.");
    }
  };
  const fieldLabels = {
    idil: "מספר זהות",
    firstName: "שם פרטי",
    lastName: "שם משפחה",
    class: "כיתה",
    dateOfBirth: "תאריך לידה",
    fatherName: "שם האב",
    motherName: "שם האם",
    fatherPhone: "טלפון האב",
    motherPhone: "טלפון האם",
    "address.street": "רחוב",
    "address.city": "עיר",
    "address.postalCode": "מיקוד",
    personalNotes: "הערות אישיות",
    img: "קישור לתמונה",
  };

  const fieldOrder = [
    "firstName",
    "lastName",
    "class",
    "dateOfBirth",
    "fatherName",
    "motherName",
    "fatherPhone",
    "motherPhone",
    "address.street",
    "address.city",
    "address.postalCode",
    "img",
    "personalNotes",
  ];
  const renderField = (field) => {
    const [parent, child] = field.split(".");
    const value = child ? formData[parent][child] : formData[field];
    const label = fieldLabels[field];

    return (
      <div
        key={field}
        className={
          field === "personalNotes"
            ? styles.personalNotesField
            : styles.inputGroup
        }
      >
        <label htmlFor={field}>{label}</label>
        {field === "personalNotes" ? (
          <textarea
            id={field}
            name={field}
            value={value}
            onChange={handleChange}
            placeholder={label}
          />
        ) : (
          <input
            id={field}
            name={field}
            value={value}
            onChange={handleChange}
            placeholder={label}
            type={field === "dateOfBirth" ? "date" : "text"}
          />
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
      {renderField("idil")}
      <div className={styles.formGrid}>{fieldOrder.map(renderField)}</div>
      <button type="submit" className={styles.submitButton}>
        הוסף תלמיד
      </button>
    </form>
  );
}
