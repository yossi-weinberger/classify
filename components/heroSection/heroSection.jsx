"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./heroSection.css";

function HeroSection() {
  const router = useRouter();
  return (
    <div className="hero-section">
      <div className="logo-wrapper">
        <Image
          src="/logoWide.png"
          alt="logo"
          width={400}
          height={400}
          className="logo"
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
      <h1 className="site-title">
        פלטפורמת ניהול תלמידים <br></br>וניתוח דפוסי התקדמות
      </h1>
      <div className="hero-content">
        <div className="image-column">
          <div className="image-wrapper">
            <Image
              src="/reports.png"
              alt="Screens"
              width={1200}
              height={1200}
              className="screen-image"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        <div className="content-column">
          <div className="content-wrapper">
            <div className="features-grid">
              {[
                "ניהול תלמידים חכם",
                "ממשק אינטואיטבי וידידותי",
                "שמירה על פרטיות המידע",
                "קבלת החלטות מבוססת נתונים",
                "ניתוח פרטני לכל תלמיד",
              ].map((text, index) => (
                <div key={index} className="feature">
                  <div className="feature-text">{text}</div>
                  <Image
                    src="/icons/V-icon.svg"
                    alt="Feature Icon"
                    width={440}
                    height={440}
                    className="feature-icon"
                  />
                </div>
              ))}
            </div>
            <button
              className="cta-button"
              onClick={() => router.push("/auth/login")}
            >
              התחברות
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
