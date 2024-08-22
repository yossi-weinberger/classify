import styles from "./EvaluationForm.module.css";

export default function EducationInfoSection({ formData, handleChange }) {
  return (
    <div className={styles.formSection}>
      <h2>מידע חינוכי</h2>
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label htmlFor="class">כיתה</label>
          <input
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            type="text"
            readOnly
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="school_name">שם בית הספר</label>
          <input
            id="school_name"
            name="school_name"
            value={formData.school_name}
            onChange={handleChange}
            type="text"
            readOnly
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label htmlFor="main_disability">לקות עיקרית</label>
          <input
            id="main_disability"
            name="main_disability"
            value={formData.main_disability}
            onChange={handleChange}
            type="text"
            readOnly
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="special_education_status">זכאות לחינוך מיוחד</label>
          <input
            id="special_education_status"
            name="special_education_status"
            checked={formData.special_education_status}
            onChange={handleChange}
            type="checkbox"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
