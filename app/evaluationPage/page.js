// page.js
import EvaluationForm from "@/components/EvaluationForm";
import styles from "./evaluationPage.module.css";
import Image from "next/image";

export default function EvaluationPage() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftBackground}>
          <div className={styles.topRightIcon}>
            <Image
              src="/icons/V-icon.svg"
              alt="Evaluation icon"
              width={120}
              height={120}
              className={styles.icon}
            />
          </div>
          <div className={styles.middleRightIcon}>
            <Image
              src="/icons/up-graph.svg"
              alt="Progress icon"
              width={120}
              height={120}
              className={styles.icon}
            />
          </div>
          <div className={styles.bottomRightIcon}>
            <Image
              src="/icons/flower.svg"
              alt="Growth icon"
              width={120}
              height={120}
              className={styles.icon}
            />
          </div>
          <div className={styles.bottomLeftIcon}>
            <Image
              src="/icons/about.svg"
              alt="Info icon"
              width={120}
              height={120}
              className={styles.icon}
            />
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.title}>טופס הערכת תלמיד</div>
          <div className={styles.formWrapper}>
            <EvaluationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
