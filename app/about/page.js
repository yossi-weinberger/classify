// About.js
import "./page.css";

import Image from "next/image";

export default function About() {
  return (
    <div className="main-about">
      <div className="about-container">
        <h1 className="about-title">,נעים להכיר</h1>
        <p className="description">
          אנחנו סטודנטים לפיתוח תוכנה ממחזור 2 של Mego
          <br /> לאחר ראיונות עם מחנכים מעולמות החינוך המיוחד הבנו את הצורך
          והמחסור בכלים לניהול וניתוח המידע כל מנת לקבל החלטות טובות יותר
          <br />
          Classify היא פלטפורמה המאפשרת לנהל ולנתח נתונים בצורה מהירה, קלה
          וידידותית למשתמש.
          <br /> אנחנו מאמינים כי יכולת ניתוח הנתונים בפלטפורמה שלנו תאפשר
          למורים ומנלי מוסדות חינוכיים לתחקר <br />
          את ההצלחות, לאתר את נקודות התורפה, להשתפר ובכך להשפיע על עתיד החינוך.
        </p>
        <div className="team">
          <div className="team-member">
            <Image
              className="member-image"
              src="/yossi.png"
              width={100}
              height={100}
              alt="member-image"
            ></Image>
            <p className="member-name">יוסי וינברגר</p>
            <p className="member-title">פיתוח טכנולוגי </p>
          </div>
          <div className="team-member">
            <Image
              className="member-image"
              src="/meni.png"
              width={100}
              height={100}
              alt="member-image"
            ></Image>
            <p className="member-name">מנחם גרטנר</p>
            <p className="member-title">פיתוח טכנולוגי </p>
          </div>
        </div>
      </div>
    </div>
  );
}
