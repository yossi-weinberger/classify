import RadioSelector from "@/components/radioSelector/radioSelector";
import styles from "./EvaluationForm.module.css";
import evaluationQuestions from './evaluationQuestions.json';

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
      {Object.values(evaluationQuestions).map(({ title, questions }) => 
        renderQuestionGroup(title, questions)
      )}
      
      <div className={styles.inputGroup}>
        <label htmlFor="additional_comments">הערות נוספות</label>
        <textarea
          id="additional_comments"
          name="additional_comments"
          value={formData.additional_comments}
          onChange={handleChange}
        />
      </div>

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
