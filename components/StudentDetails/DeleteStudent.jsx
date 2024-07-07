"use client";

import React, { useState } from "react";
import styles from "./StudentDetails.module.css";
import { deleteStudent as apiDeleteStudent } from "@/functions/apiCalls";
import { revalidateStudentCache } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function DeleteStudent({ idil, classId }) {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage("");

    try {
      await apiDeleteStudent(idil);
      await revalidateStudentCache(classId);
      setShowModal(false);

      // חזרה לדף הקודם (דף הכיתה)
      router.back();

      // אופציונלי: אם רוצים לוודא שהדף מתרענן לאחר החזרה
      // setTimeout(() => router.refresh(), 100);
    } catch (error) {
      console.error("Error deleting student:", error);
      setErrorMessage(
        error.message || "An error occurred while deleting the student."
      );
    } finally {
      setIsDeleting(false);
    }
  };
  // "use client";

  // import React, { useState } from "react";
  // import styles from "./StudentDetails.module.css";
  // import { deleteStudent as apiDeleteStudent } from "@/functions/apiCalls";
  // import { revalidateStudentCache } from "@/app/actions"; // עדכן את הנתיב בהתאם למיקום הקובץ שלך
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

  //       // ביטול תוקף המטמון
  //       await revalidateStudentCache(classId);

  //       setShowModal(false);
  //       router.refresh(); // רענון הדף הנוכחי
  //     } catch (error) {
  //       console.error("Error deleting student:", error);
  //       setErrorMessage(
  //         error.message || "An error occurred while deleting the student."
  //       );
  //     } finally {
  //       setIsDeleting(false);
  //     }
  //   };

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
              <button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "מוחק..." : "כן, מחק"}
              </button>
              <button onClick={() => setShowModal(false)} disabled={isDeleting}>
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// "use client";

// import React, { useState } from "react";
// import styles from "./StudentDetails.module.css";
// import { deleteStudent } from "@/functions/apiCalls";
// import { useRouter } from "next/navigation";

// export default function DeleteStudent({ idil, classId }) {
//   const [showModal, setShowModal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const router = useRouter();

//   const handleDelete = async () => {
//     try {
//       await deleteStudent(idil);
//       setShowModal(false);

//       // סמן שנעשתה מחיקה
//       localStorage.setItem("studentDeleted", "true");
//       localStorage.setItem("deletedStudentIdil", idil);
//       localStorage.setItem("deletedFromClassId", classId);

//       // חזרה לדף הקודם
//       router.back();
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       setErrorMessage(
//         error.message || "An error occurred while deleting the student."
//       );
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
//               <button onClick={handleDelete}>כן, מחק</button>
//               <button onClick={() => setShowModal(false)}>ביטול</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
