"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./AddStudentForm.module.css";
import { addStudent, uploadImage, getAllSchoolClasses } from "@/functions/api";
import Image from "next/image";
import { useSortContext } from "@/providers/SortProvider";
import { validateForm } from "./validations";
import Loading from "../loading/loading";
import SubmitLoading from "../submitLoading/submitLoading";

export default function AddStudentForm() {
  const { sortItems } = useSortContext();
  const initialFormState = {
    idil: "",
    gender: "",
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
    img: "",
    personalNotes: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [classes, setClasses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const fetchClasses = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAllSchoolClasses();
      if (response.status === "success" && Array.isArray(response.data)) {
        setClasses(response.data);
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      setError("שגיאה בטעינת רשימת הכיתות");
      setClasses([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      } else {
        return {
          ...prev,
          [name]: name === "idil" ? (value === "" ? "" : Number(value)) : value,
        };
      }
    });
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setError("אנא בחר קובץ תמונה תקין");
      setSelectedFile(null);
    }
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
      let imageUrl = formData.img;
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const updatedFormData = {
        ...formData,
        idil: Number(formData.idil),
        img: imageUrl,
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      };

      await addStudent(updatedFormData);

      setSuccess(
        `התלמיד ${formData.firstName} ${formData.lastName} נוסף בהצלחה!`
      );
      setFormData(initialFormState);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error adding student:", error);
      setError(error.message || "אירעה שגיאה בעת הוספת התלמיד.");
    } finally {
      setIsLoading(false);
    }
  };

  const fieldLabels = {
    idil: "מספר זהות",
    gender: "מגדר",
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
    img: "תמונה",
    personalNotes: "הערות אישיות",
  };

  const fieldOrder = [
    "idil",
    "gender",
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

  const renderField = useCallback(
    (field) => {
      if (field === "img") {
        return (
          <div key={field} className={styles.inputGroup}>
            <label htmlFor="imageUpload">{fieldLabels[field]}</label>
            <div className={styles.fileInputWrapper}>
              <input
                type="file"
                id="imageUpload"
                onChange={handleFileChange}
                accept="image/*"
                className={styles.fileInput}
              />
              <span className={styles.fileInputText}>
                {selectedFile ? selectedFile.name : "בחר קובץ"}
              </span>
              <Image
                src="/icons/upload.svg"
                alt="Upload icon"
                width={20}
                height={20}
                className={styles.uploadIcon}
              />
            </div>
          </div>
        );
      } else if (field === "class") {
        const sortedClasses = sortItems(classes, "className");
        return (
          <div key={field} className={styles.inputGroup}>
            <label htmlFor={field}>{fieldLabels[field]}</label>
            <select
              id={field}
              name={field}
              value={
                formData.class
                  ? classes.find((c) => c.className === formData.class)?._id ||
                    ""
                  : ""
              }
              onChange={(e) => {
                const selectedClass = classes.find(
                  (c) => c._id === e.target.value
                );
                handleChange({
                  target: {
                    name: "class",
                    value: selectedClass ? selectedClass.className : "",
                  },
                });
              }}
              required
              className={styles.selectInput}
            >
              <option value="">בחר כיתה</option>
              {sortedClasses.length > 0 ? (
                sortedClasses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.className} - {c.teacher}
                  </option>
                ))
              ) : (
                <option disabled>אין כיתות זמינות</option>
              )}
            </select>
          </div>
        );
      } else if (field === "gender") {
        return (
          <div key={field} className={styles.inputGroup}>
            <label htmlFor={field}>{fieldLabels[field]}</label>
            <select
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className={styles.selectInput}
            >
              <option value="">בחר מגדר</option>
              <option value="בן">בן</option>
              <option value="בת">בת</option>
            </select>
          </div>
        );
      }
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
              required={field !== "personalNotes"}
            />
          )}
        </div>
      );
    },
    [classes, formData, handleChange, handleFileChange, selectedFile, sortItems]
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>{fieldOrder.map(renderField)}</div>
      {error && <div className={styles.error}>{error}</div>}
      {Object.keys(validationErrors).length > 0 && (
        <div className={styles.errorContainer}>
          <p className={styles.errorTitle}>יש לתקן את השגיאות הבאות:</p>
          <div className={styles.errorList}>
            {Object.entries(validationErrors).map(([field, error]) => {
              const [parent, child] = field.split(".");
              const label = child
                ? fieldLabels[`${parent}.${child}`]
                : fieldLabels[field];
              return (
                <p key={field} className={styles.errorItem}>
                  {`${label}: ${error}`}
                </p>
              );
            })}
          </div>
        </div>
      )}
      {success && <div className={styles.success}>{success}</div>}
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
          "הוסף תלמיד"
        )}
      </button>
    </form>
  );
}
