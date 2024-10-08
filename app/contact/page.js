import Contact from "@/components/contact/contact";
import styles from "./ContactPage.module.css";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftBackground}>
          <div className={styles.topRightIcon}>
            <Image
              src="/icons/about.svg"
              alt="Top right icon"
              width={120}
              height={120}
            />
          </div>
          <div className={styles.middleRightIcon}>
            <Image
              src="/icons/graphs.svg"
              alt="Middle right icon"
              width={120}
              height={120}
            />
          </div>
          <div className={styles.bottomRightIcon}>
            <Image
              src="/icons/data.svg"
              alt="Bottom right icon"
              width={120}
              height={120}
            />
          </div>
          <div className={styles.bottomLeftIcon}>
            <Image
              src="/icons/info.svg"
              alt="Bottom left icon"
              width={120}
              height={120}
            />
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.title}>נשמח לשוחח</div>
          <div className={styles.formWrapper}>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
}
