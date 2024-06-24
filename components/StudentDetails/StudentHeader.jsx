import Image from "next/image";
import styles from "./StudentDetails.module.css";

export default function StudentHeader({ student, classInfo }) {
  return (
    <div className={styles.header}>
      <Image
        src={student.img || "/placeholder.png"}
        alt={`${student.firstName} ${student.lastName}`}
        width={200}
        height={200}
        className={styles.studentImage}
      />
      <h1>
        {student.firstName} {student.lastName}
      </h1>
      <h2>ת.ז: {student.idil}</h2>
      <h2>כיתה: {classInfo.className}</h2>
    </div>
  );
}
