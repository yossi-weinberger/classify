import React from "react";
import styles from "./StudentDetails.module.css";

export default function PersonalDetails({ student }) {
  return (
    <div className={styles.personalDetails}>
      <h2 className={styles.title}>פרטי תלמיד</h2>

      <div className={styles.infoSection}>
        <div className={styles.leftColumn}>
          <div className={styles.parentsInfo}>
            <h3>פרטי הורים:</h3>
            <div className={styles.parentCard}>
              <div className={styles.parentItem}>
                <span className={styles.icon}>👨</span>
                <p>אבא: {student.fatherName}</p>
              </div>
              <div className={styles.parentItem}>
                <span className={styles.icon}>📞</span>
                <p>טלפון: {student.fatherPhone}</p>
              </div>
            </div>
            <div className={styles.parentCard}>
              <div className={styles.parentItem}>
                <span className={styles.icon}>👩</span>
                <p>אמא: {student.motherName}</p>
              </div>
              <div className={styles.parentItem}>
                <span className={styles.icon}>📞</span>
                <p>טלפון: {student.motherPhone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.addressInfo}>
            <h3>כתובת:</h3>
            <div className={styles.infoItem}>
              <span className={styles.icon}>📍</span>
              <p>
                {student.address.street}, {student.address.city}{" "}
                {student.address.postalCode}
              </p>
            </div>
          </div>

          <div className={styles.birthDateInfo}>
            <h3>תאריך לידה:</h3>
            <div className={styles.infoItem}>
              <span className={styles.icon}>📅</span>
              <p>{student.dateOfBirth}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import styles from "./StudentDetails.module.css";

// export default function PersonalDetails({ student }) {
//   return (
//     <div className={styles.personalDetails}>
//       {/* <h2>כיתה: {classInfo.className}</h2> */}
//       <p>תאריך לידה: {student.dateOfBirth}</p>
//       <h3>פרטי הורים:</h3>
//       <p>
//         אבא: {student.fatherName}
//         <p>טלפון: {student.fatherPhone}</p>
//       </p>
//       <p>
//         אמא: {student.motherName}
//         <p>טלפון: {student.motherPhone}</p>
//       </p>
//       <h3>כתובת:</h3>
//       <p>
//         {student.address.street}, {student.address.city}{" "}
//         {student.address.postalCode}
//       </p>
//     </div>
//   );
// }
