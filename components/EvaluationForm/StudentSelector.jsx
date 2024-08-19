import styles from "./EvaluationForm.module.css";

export default function StudentSelector({
  classes,
  students,
  selectedClassId,
  setSelectedClassId,
  onStudentSelect,
}) {
  return (
    <div className={styles.formSection}>
      <h2>בחירת תלמיד</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="classSelect">בחר כיתה</label>
        <select
          id="classSelect"
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
        >
          <option value="">בחר כיתה</option>
          {classes.length > 0 ? (
            classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.className} - {c.teacher}
              </option>
            ))
          ) : (
            <option disabled>אין כיתות זמינות</option>
          )}
        </select>
      </div>

      {selectedClassId && (
        <div className={styles.inputGroup}>
          <label htmlFor="studentSelect">בחר תלמיד</label>
          <select
            id="studentSelect"
            onChange={(e) => {
              const selectedStudent = students.find(
                (s) => s._id === e.target.value
              );
              onStudentSelect(selectedStudent);
            }}
          >
            <option value="">בחר תלמיד</option>
            {students.length > 0 ? (
              students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.firstName} {s.lastName}
                </option>
              ))
            ) : (
              <option disabled>אין תלמידים בכיתה זו</option>
            )}
          </select>
        </div>
      )}
    </div>
  );
}
