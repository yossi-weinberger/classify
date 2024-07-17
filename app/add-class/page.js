import AddClassForm from "@/components/addClass/AddClassForm";
import styles from "./AddClassPage.module.css";
import Image from "next/image";

export default function AddClassPage() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftBackground}>
          <div className={styles.topRightIcon}>
            <Image
              src="/icons/V-icon.svg"
              alt="Class icon"
              width={120}
              height={120}
              className={styles.icon}
            />
          </div>
          <div className={styles.middleRightIcon}>
            <Image
              src="/icons/up-graph.svg"
              alt="Classroom icon"
              width={120}
              height={120}
              className={styles.icon}
            />
          </div>
          <div className={styles.bottomRightIcon}>
            <Image
              src="/icons/flower.svg"
              alt="Pencil icon"
              width={120}
              height={120}
              className={styles.icon}
            />
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.title}>הוספת כיתה חדש</div>
          <div className={styles.formWrapper}>
            <div className={styles.formContainer}>
              <AddClassForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
