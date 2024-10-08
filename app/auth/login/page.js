"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./Login.module.css";
import GoogleIcon from "./google-icon";

export default function Login() {
  const { data: session, status, error } = useSession();
  const renderButton = (text, onClick) => (
    <button onClick={onClick} className={styles.button}>
      <GoogleIcon />
      {text}
    </button>
  );

  if (session) {
    return (
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <p className={styles.title}>Welcome,{session.user.name}</p>
          <p className={styles.title}>
            לצורכי הדגמה, האתר פתוח לכולם <br></br>יש לבצע אימות רק מול חשבון
            גוגל
          </p>
          {/* <button onClick={() => signOut()} className={styles.button}>
              Sign out
            </button> */}
          {renderButton("Sign out", () => signOut("google"))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <p className={styles.title}>
          לצורכי הדגמה, האתר פתוח לכולם <br></br>יש לבצע אימות רק מול חשבון גוגל
        </p>
        {renderButton("Sign in with Google", () => signIn("google"))}
      </div>
    </div>
  );
}
