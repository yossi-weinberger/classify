import React, { useState } from "react";
import styles from "./StudentDetails.module.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function PersonalNotes({ notes, onAddNote }) {
  const [newNote, setNewNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote("");
    }
  };

  return (
    <div className={styles.personalNotesContainer}>
      <div className={styles.existingNotes}>
        <h3>הערות אישיות:</h3>
        <ul>
          {notes.map((note, index) => (
            <li key={index} className={styles.noteItem}>
              <span className={styles.noteDate}>{formatDate(note.date)}</span>
              <span className={styles.noteText}>{note.note}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.newNoteForm}>
        <h3>הוסף הערה חדשה:</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="הכנס הערה חדשה"
            rows="4"
          />
          <button type="submit">הוסף הערה</button>
        </form>
      </div>
    </div>
  );
}

// import styles from "./StudentDetails.module.css";

// export default function PersonalNotes({ notes }) {
//   return (
//     <div className={styles.personalNotes}>
//       <h3>הערות אישיות:</h3>
//       <ul>
//         {notes.map((note, index) => (
//           <li key={index}>
//             <strong>{note.date}:</strong> {note.note}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
