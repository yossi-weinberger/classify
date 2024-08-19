import styles from "./EvaluationForm.module.css";

export default function PersonalInfoSection({ formData, handleChange }) {
  return (
    <div className={styles.formSection}>
      <h2>פרטים אישיים</h2>
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
      <div className={styles.inputGroup}>
        <label htmlFor="gender">מגדר</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          disabled
        >
          <option value="">בחר</option>
          <option value="male">זכר</option>
          <option value="female">נקבה</option>
          <option value="other">אחר</option>
        </select>
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
  );
}
