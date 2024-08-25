"use client";
import { useState } from "react";
import styles from "./AddClassForm.module.css";
// import { addClass } from "@/functions/api";
import { addClass } from "@/functions/api";

export default function AddClassForm() {
  const [formData, setFormData] = useState({
    className: "",
    teacher: "",
    img: "https://res.cloudinary.com/df4ysoodx/image/upload/v1721035122/fmvvwja3emakk7ktgb1d.jpg",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addClass(formData);
      setSuccess(`כיתה ${formData.className} נוספה בהצלחה!`);
      setFormData({
        className: "",
        teacher: "",
      });
    } catch (error) {
      console.error("Error adding Class:", error);
      setError(error.message || "An error occurred while adding the Class.");
    }
  };

  const fieldLabels = {
    className: "כיתה",
    teacher: "מורה",
  };

  const fieldOrder = ["className", "teacher"];

  const renderField = (field) => {
    const value = formData[field];
    const label = fieldLabels[field];

    return (
      <div key={field} className={styles.inputGroup}>
        <label htmlFor={field}>{label}</label>
        <input
          id={field}
          name={field}
          value={value}
          onChange={handleChange}
          placeholder={label}
          type="text"
        />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
      <div className={styles.formGrid}>{fieldOrder.map(renderField)}</div>
      <button type="submit" className={styles.submitButton}>
        הוסף כיתה
      </button>
    </form>
  );
}
