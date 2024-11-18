"use client";
import { useState, useCallback } from "react";
import styles from "./AddClassForm.module.css";
import { validateForm } from "./validations";
import SubmitLoading from "../submitLoading/submitLoading";
import { addClassAction } from "@/app/actions";

export default function AddClassForm() {
  const [formData, setFormData] = useState({
    className: "",
    teacher: "",
    img: "https://res.cloudinary.com/df4ysoodx/image/upload/v1721035122/fmvvwja3emakk7ktgb1d.jpg",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setValidationErrors({});

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await addClassAction(formData);

      if (result.success) {
        setSuccess(`כיתה ${formData.className} נוספה בהצלחה!`);
        setFormData({
          className: "",
          teacher: "",
          img: "https://res.cloudinary.com/df4ysoodx/image/upload/v1721035122/fmvvwja3emakk7ktgb1d.jpg",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error adding Class:", error);
      setError(error.message || "אירעה שגיאה בעת הוספת הכיתה.");
    } finally {
      setIsLoading(false);
    }
  };

  const fieldLabels = {
    className: "כיתה",
    teacher: "מורה",
  };

  const fieldOrder = ["className", "teacher"];

  const renderField = useCallback(
    (field) => {
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
    },
    [formData, handleChange]
  );
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>{fieldOrder.map(renderField)}</div>
      {Object.keys(validationErrors).length > 0 && (
        <div className={styles.errorContainer}>
          <p className={styles.errorTitle}>יש לתקן את השגיאות הבאות:</p>
          <div className={styles.errorList}>
            {Object.entries(validationErrors).map(([field, error]) => (
              <p key={field} className={styles.errorItem}>
                {`${fieldLabels[field]}: ${error}`}
              </p>
            ))}
          </div>
        </div>
      )}
      {success && <div className={styles.success}>{success}</div>}
      {error && <div className={styles.error}>{error}</div>}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className={styles.loadingWrapper}>
            <SubmitLoading />
          </div>
        ) : (
          "הוסף כיתה"
        )}
      </button>
    </form>
  );
}
