import React from "react";
import Image from "next/image";
import styles from "./StudentDetails.module.css";

const StudentHeader = ({ student, classInfo }) => {
  return (
    <div className={styles.studentHeader}>
      <div className={styles.studentImage}>
        <Image
          src={student.img}
          alt={`תמונה של ${student.firstName} ${student.lastName}`}
          width={200}
          height={200}
          style={{ width: "100%", height: "auto" }} // זה מחליף את layout="responsive"
        />
      </div>
      <div className={styles.studentInfo}>
        <h1>
          {student.firstName} {student.lastName}
        </h1>
        <h2>ת.ז: {student.idil}</h2>
        <h2>כיתה: {classInfo.className}&apos;</h2>
      </div>
    </div>
  );
};

export default StudentHeader;
