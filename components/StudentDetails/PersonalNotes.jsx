import styles from "./StudentDetails.module.css";

export default function PersonalNotes({ notes }) {
  return (
    <div className={styles.personalNotes}>
      <h3>הערות אישיות:</h3>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <strong>{note.date}:</strong> {note.note}
          </li>
        ))}
      </ul>
    </div>
  );
}
