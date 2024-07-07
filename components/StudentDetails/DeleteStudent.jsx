"use client";

import React, { useState } from "react";
import styles from "./StudentDetails.module.css";
import { deleteStudent } from "@/functions/apiCalls";
import { useRouter } from "next/navigation";

export default function DeleteStudent({ idil, classId }) {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteStudent(idil);
      setShowModal(false);

      // סמן שנעשתה מחיקה
      localStorage.setItem("studentDeleted", "true");
      localStorage.setItem("deletedStudentIdil", idil);
      localStorage.setItem("deletedFromClassId", classId);

      // חזרה לדף הקודם
      router.back();
    } catch (error) {
      console.error("Error deleting student:", error);
      setErrorMessage(
        error.message || "An error occurred while deleting the student."
      );
    }
  };

  return (
    <>
      <button
        className={`${styles.tab} ${styles.deleteButton}`}
        onClick={() => setShowModal(true)}
      >
        מחק תלמיד
      </button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>האם אתה בטוח שברצונך למחוק את התלמיד?</h2>
            <p>פעולה זו אינה הפיכה.</p>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <div className={styles.modalButtons}>
              <button onClick={handleDelete}>כן, מחק</button>
              <button onClick={() => setShowModal(false)}>ביטול</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
