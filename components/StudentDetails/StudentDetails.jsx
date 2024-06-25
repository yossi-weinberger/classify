"use client";

import React, { useState } from "react";
import StudentHeader from "./StudentHeader";
import PersonalDetails from "./PersonalDetails";
import PersonalNotes from "./PersonalNotes";
import ProgressChart from "./ProgressChart";
import styles from "./StudentDetails.module.css";

export default function StudentDetails({ student, classInfo }) {
  const [activeTab, setActiveTab] = useState("details");

  if (!student || !classInfo) return <div>לא נמצא מידע</div>;

  return (
    <div className={styles.studentDetails}>
      <StudentHeader student={student} classInfo={classInfo} />
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
      </div>
      <div className={styles.tabContent}>
        {activeTab === "details" && <PersonalDetails student={student} />}
        {activeTab === "notes" && (
          <PersonalNotes notes={student.personalNotes} />
        )}
        {activeTab === "progress" && <ProgressChart student={student} />}
      </div>
    </div>
  );
}
