import React, { useEffect, useState } from "react";
import styles from "./StudentDetails.module.css";
import Loading from "../loading/loading";

export default function ProgressChart({ student }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!student || !student.idil) {
      console.error("Student object or student.idil is missing:", student);
      return;
    }

    const baseUrl =
      "https://lookerstudio.google.com/embed/reporting/8db54529-10af-4baf-8571-3b10177e35fe/page/p_65d4chzjid";

    const params = {
      "ds0.studentid": student.idil.toString(), // השתמש בשם המדויק של הפרמטר ומומר למחרוזת
    };
    const paramsString = JSON.stringify(params);
    const encodedParams = encodeURIComponent(paramsString);

    const fullUrl = `${baseUrl}?params=${encodedParams}`;
    // console.log("Generated URL:", fullUrl);
    // console.log("Student ID used for filtering:", student.idil);

    setUrl(fullUrl);
  }, [student]);

  // בדיקה אם ה-URL נוצר בהצלחה
  useEffect(() => {
    if (url) {
      console.log("URL set successfully:", url);
    } else {
      console.warn("URL is empty");
    }
  }, [url]);

  if (!student || !student.idil) {
    return <div>Error: Student data is missing</div>;
  }

  return (
    <div className={styles.progressChart}>
      <h3>התקדמות לאורך ציר הזמן</h3>
      <div className={styles.singleStudentGraph}>
        {/* <div>Debug URL: {url}</div> */}
        {url ? (
          <iframe
            width="100%"
            height="280"
            src={url} // שימוש ב-url במקום fullUrl
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
      {/* <div>Debug Info: Student ID = {student.idil}</div> */}
    </div>
  );
}
