"use client";
import { Container } from "@chakra-ui/react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import "./teacher-form.css";

export default function TeacherForm() {
  const [iframeHeight, setIframeHeight] = useState("2156px"); // גובה ברירת מחדל
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        setIframeHeight(`${window.innerHeight - 200}px`); // מחסיר 200px עבור תמונה וכותרת
      }
    };

    handleResize(); // קריאה ראשונית
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="teacherForm-page">
      <Container className="teacherForm-container">
        <div className="image-wrapper">
          <Image
            src="/logoWide.jpg" // החלף זאת בנתיב לתמונה שלך
            alt="Teacher Form Header"
            width={200}
            height={100}
            layout="responsive"
          />
        </div>
        <h1 className="form-title">טופס מורה</h1>
        <div className="teacherForm-wrapper" style={{ height: iframeHeight }}>
          <iframe
            ref={iframeRef}
            className="teacherForm"
            src="https://docs.google.com/forms/d/e/1FAIpQLSdLrypWXfN2wmxtZmo6UW20gFoSoXFmBZBBFaMZbLX6cicGAQ/viewform?embedded=true"
          ></iframe>
        </div>
      </Container>
    </div>
  );
}
