import styles from "./submitLoading.module.css";

export default function SubmitLoading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.submitLoader}>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
      </div>
    </div>
  );
}