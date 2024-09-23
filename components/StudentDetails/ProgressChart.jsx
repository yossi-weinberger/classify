import React, { useEffect, useState } from "react";
import styles from "./StudentDetails.module.css";
import Loading from "../loading/loading";

export default function ProgressChart({ student }) {
  const [url, setUrl] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!student || !student.idil) {
      console.error("Student object or student.idil is missing:", student);
      return;
    }

    const desktopBaseUrl =
      "https://lookerstudio.google.com/embed/reporting/ccc30b42-fc04-4a4b-a15f-c76e26babef7/page/p_65d4chzjid";
    const mobileBaseUrl =
      "https://lookerstudio.google.com/embed/reporting/2d72c044-0e4b-4cae-b96a-801fbfc7226f/page/p_65d4chzjid";
    const baseUrl = isMobile ? mobileBaseUrl : desktopBaseUrl;

    const params = {
      "ds0.studentid": student.idil.toString(),
    };
    const paramsString = JSON.stringify(params);
    const encodedParams = encodeURIComponent(paramsString);

    const fullUrl = `${baseUrl}?params=${encodedParams}`;

    setUrl(fullUrl);
  }, [student, isMobile]);

  if (!student || !student.idil) {
    return <div>Error: Student data is missing</div>;
  }

  return (
    <div className={styles.progressChart}>
      <h3>התקדמות לאורך ציר הזמן</h3>
      <div className={styles.singleStudentGraph}>
        {url ? (
          <iframe
            width="100%"
            height={isMobile ? "400px" : "280px"}
            src={url}
            frameBorder="0"
            allowFullScreen
            className={styles.progressIframe}
          ></iframe>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
