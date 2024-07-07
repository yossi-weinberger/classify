"use client";

import React, { useState } from "react";
import StudentHeader from "./StudentHeader";
import PersonalDetails from "./PersonalDetails";
import PersonalNotes from "./PersonalNotes";
import ProgressChart from "./ProgressChart";
import DeleteStudent from "./DeleteStudent";
import styles from "./StudentDetails.module.css";

export default function StudentDetails({
  student,
  classInfo,
  updateStudent,
  onDeleteStudent,
}) {
  const [activeTab, setActiveTab] = useState("details");
  const [localStudent, setLocalStudent] = useState(student);

  if (!localStudent || !classInfo) return <div>לא נמצא מידע</div>;

  const addNote = (newNote) => {
    const updatedNotes = [...localStudent.personalNotes, newNote];
    const updatedStudent = { ...localStudent, personalNotes: updatedNotes };
    setLocalStudent(updatedStudent);
    if (typeof updateStudent === "function") {
      updateStudent(updatedStudent);
    }
  };

  return (
    <div className={styles.studentDetails}>
      <StudentHeader student={localStudent} classInfo={classInfo} />
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "details" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("details")}
        >
          פרטים אישיים
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "notes" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("notes")}
        >
          הערות אישיות
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "progress" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("progress")}
        >
          התקדמות
        </button>
        <DeleteStudent idil={localStudent.idil} onDelete={onDeleteStudent} />
      </div>
      <div className={styles.tabContent}>
        {activeTab === "details" && <PersonalDetails student={localStudent} />}
        {activeTab === "notes" && (
          <PersonalNotes
            idil={localStudent.idil}
            notes={localStudent.personalNotes}
            onAddNote={addNote}
          />
        )}
        {activeTab === "progress" && <ProgressChart student={localStudent} />}
      </div>
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import StudentHeader from "./StudentHeader";
// import PersonalDetails from "./PersonalDetails";
// import PersonalNotes from "./PersonalNotes";
// import ProgressChart from "./ProgressChart";
// import styles from "./StudentDetails.module.css";

// export default function StudentDetails({ student, classInfo, updateStudent }) {
//   const [activeTab, setActiveTab] = useState("details");
//   const [localStudent, setLocalStudent] = useState(student);

//   if (!localStudent || !classInfo) return <div>לא נמצא מידע</div>;

//   const addNote = (newNote) => {
//     const updatedNotes = [...localStudent.personalNotes, newNote];
//     const updatedStudent = { ...localStudent, personalNotes: updatedNotes };
//     setLocalStudent(updatedStudent);
//     if (typeof updateStudent === "function") {
//       updateStudent(updatedStudent);
//     }
//   };

//   return (
//     <div className={styles.studentDetails}>
//       <StudentHeader student={localStudent} classInfo={classInfo} />
//       <div className={styles.tabs}>
//         <button
//           className={`${styles.tab} ${
//             activeTab === "details" ? styles.active : ""
//           }`}
//           onClick={() => setActiveTab("details")}
//         >
//           פרטים אישיים
//         </button>
//         <button
//           className={`${styles.tab} ${
//             activeTab === "notes" ? styles.active : ""
//           }`}
//           onClick={() => setActiveTab("notes")}
//         >
//           הערות אישיות
//         </button>
//         <button
//           className={`${styles.tab} ${
//             activeTab === "progress" ? styles.active : ""
//           }`}
//           onClick={() => setActiveTab("progress")}
//         >
//           התקדמות
//         </button>
//       </div>
//       <div className={styles.tabContent}>
//         {activeTab === "details" && <PersonalDetails student={localStudent} />}
//         {activeTab === "notes" && (
//           <PersonalNotes
//             idil={localStudent.idil}
//             notes={localStudent.personalNotes}
//             onAddNote={addNote}
//           />
//         )}
//         {activeTab === "progress" && <ProgressChart student={localStudent} />}
//       </div>
//     </div>
//   );
// }
