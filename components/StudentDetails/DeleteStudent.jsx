"use client";

import React, { useState, useEffect } from "react";
import styles from "./StudentDetails.module.css";
import { deleteStudent as apiDeleteStudent } from "@/functions/apiCalls";
import { revalidateStudentCache } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function DeleteStudent({ idil, classId }) {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showModal]);

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage("");

    try {
      await apiDeleteStudent(idil);
      await revalidateStudentCache(classId);
      setShowModal(false);
      router.back();
    } catch (error) {
      console.error("Error deleting student:", error);
      setErrorMessage(
        error.message || "An error occurred while deleting the student."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        className={styles.deleteButton}
        onClick={() => setShowModal(true)}
      >
        מחק תלמיד
      </button>
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>
              האם אתה בטוח שברצונך למחוק את התלמיד?
            </h2>
            <p className={styles.modalDescription}>
              פעולה זו היא בלתי הפיכה. התלמיד יימחק לצמיתות מהמערכת.
            </p>
            <div className={styles.modalButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowModal(false)}
              >
                ביטול
              </button>
              <button
                className={styles.confirmButton}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "מוחק..." : "אישור מחיקה"}
              </button>
            </div>
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
// "use client";

// import React, { useState } from "react";
// import styles from "./StudentDetails.module.css";
// import { deleteStudent as apiDeleteStudent } from "@/functions/apiCalls";
// import { revalidateStudentCache } from "@/app/actions";
// import { useRouter } from "next/navigation";

// export default function DeleteStudent({ idil, classId }) {
//   const [showModal, setShowModal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const router = useRouter();

//   const handleDelete = async () => {
//     setIsDeleting(true);
//     setErrorMessage("");

//     try {
//       await apiDeleteStudent(idil);
//       await revalidateStudentCache(classId);
//       setShowModal(false);

//       // חזרה לדף הקודם (דף הכיתה)
//       router.back();

//       // אופציונלי: אם רוצים לוודא שהדף מתרענן לאחר החזרה
//       // setTimeout(() => router.refresh(), 100);
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       setErrorMessage(
//         error.message || "An error occurred while deleting the student."
//       );
//     } finally {
//       setIsDeleting(false);
//     }
//   };
//   return (
//     <>
//       <button
//         className={`${styles.tab} ${styles.deleteButton}`}
//         onClick={() => setShowModal(true)}
//       >
//         מחק תלמיד
//       </button>

//       {showModal && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h2>האם אתה בטוח שברצונך למחוק את התלמיד?</h2>
//             <p>פעולה זו אינה הפיכה.</p>
//             {errorMessage && <p className={styles.error}>{errorMessage}</p>}
//             <div className={styles.modalButtons}>
//               <button onClick={handleDelete} disabled={isDeleting}>
//                 {isDeleting ? "מוחק..." : "כן, מחק"}
//               </button>
//               <button onClick={() => setShowModal(false)} disabled={isDeleting}>
//                 ביטול
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
