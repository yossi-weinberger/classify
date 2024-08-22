import RadioSelector from "@/components/radioSelector/RadioSelector";
import styles from "./EvaluationForm.module.css";

export default function EvaluationSection({ formData, handleChange }) {
  const renderEvaluationField = (name, label) => (
    <div className={styles.inputGroup}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.radioSelectorContainer}>
        <RadioSelector
          value={formData[name] || "1"}
          onChange={(value) => handleChange({ target: { name, value } })}
          name={name}
        />
      </div>
    </div>
  );

  const renderQuestionGroup = (title, questions) => (
    <div className={styles.questionGroup}>
      <h3>{title}</h3>
      {questions.map(({ name, label }) => renderEvaluationField(name, label))}
    </div>
  );

  return (
    <div className={styles.formSection}>
      <h2>הערכה</h2>
      {renderQuestionGroup("מיומנויות חברתיות", [
        { name: "social_competence_1", label: "יוזם ושומר על קשרים חברתיים" },
        { name: "social_competence_2", label: "מבין ומגיב לרמזים חברתיים" },
        { name: "social_competence_3", label: "משתתף בעבודה קבוצתית" },
      ])}
      {renderQuestionGroup("ויסות רגשי", [
        { name: "emotional_regulation_1", label: "מזהה ומבטא רגשות" },
        { name: "emotional_regulation_2", label: "מסוגל להרגיע את עצמו" },
        { name: "emotional_regulation_3", label: "מתמודד עם שינויים" },
      ])}
      {renderQuestionGroup("מוטיבציה ללמידה", [
        { name: "learning_motivation_1", label: "מגלה עניין ומעורבות" },
        { name: "learning_motivation_2", label: "מתמיד במשימות למרות קשיים" },
        { name: "learning_motivation_3", label: "מציב ופועל להשגת מטרות" },
      ])}
      {renderQuestionGroup("מיומנויות קוגניטיביות", [
        { name: "cognitive_skills_1", label: "פותר בעיות מורכבות" },
        { name: "cognitive_skills_2", label: "זוכר ושולף מידע" },
        { name: "cognitive_skills_3", label: "מגלה חשיבה יצירתית" },
      ])}
      <div className={styles.inputGroup}>
        <label htmlFor="additional_comments">הערות נוספות</label>
        <textarea
          id="additional_comments"
          name="additional_comments"
          value={formData.additional_comments}
          onChange={handleChange}
        />
      </div>
      
      {/* שדות חדשים עבור שם ממלא ההערכה ותפקידו, אחד ליד השני */}
      <div className={styles.evaluatorInfo}>
        <div className={styles.inputGroup}>
          <label htmlFor="evaluator_name">שם ממלא ההערכה</label>
          <input
            type="text"
            id="evaluator_name"
            name="evaluator_name"
            value={formData.evaluator_name}
            onChange={handleChange}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="evaluator_role">תפקיד ממלא ההערכה</label>
          <input
            type="text"
            id="evaluator_role"
            name="evaluator_role"
            value={formData.evaluator_role}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}