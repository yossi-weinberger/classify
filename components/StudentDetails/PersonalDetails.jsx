import styles from "./StudentDetails.module.css";

export default function PersonalDetails({ student }) {
  return (
    <div className={styles.personalDetails}>
      {/* <h2>כיתה: {classInfo.className}</h2> */}
      <p>תאריך לידה: {student.dateOfBirth}</p>
      <h3>פרטי הורים:</h3>
      <p>
        אבא: {student.fatherName} (טלפון: {student.fatherPhone})
      </p>
      <p>
        אמא: {student.motherName} (טלפון: {student.motherPhone})
      </p>
      <h3>כתובת:</h3>
      <p>
        {student.address.street}, {student.address.city}{" "}
        {student.address.postalCode}
      </p>
    </div>
  );
}
