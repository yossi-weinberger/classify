import styles from "./EvaluationForm.module.css";
import Image from "next/image";

export default function PersonalInfoSection({ formData, handleChange }) {
  return (
    <div className={styles.formSection}>
      <h2>פרטים אישיים</h2>
      <div className={styles.personalInfoContainer}>
        <div className={styles.studentImage}>
          {formData.image_url && (
            <Image
              src={formData.image_url}
              alt={`תמונה של ${formData.first_name} ${formData.last_name}`}
              width={150}
              height={150}
              objectFit="cover"
            />
          )}
        </div>
        <div className={styles.personalInfoFields}>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="first_name">שם פרטי</label>
              <input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                type="text"
                readOnly
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="last_name">שם משפחה</label>
              <input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                type="text"
                readOnly
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="gender">מגדר</label>
              <input
                id="gender"
                name="gender"
                value={formData.gender}
                type="text"
                readOnly
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="date_of_birth">תאריך לידה</label>
              <input
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                type="date"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
