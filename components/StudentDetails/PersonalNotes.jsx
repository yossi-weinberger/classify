"use client";

import React, { useState } from "react";
import styles from "./StudentDetails.module.css";
import { addPersonalNoteToStudent } from "../../functions/api/index";
import SubmitLoading from "../submitLoading/submitLoading";

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export default function PersonalNotes({ idil, notes, onAddNote }) {
  const [newNote, setNewNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      setIsLoading(true);
      setError(null);
      try {
        const result = await addPersonalNoteToStudent(idil, newNote);
        if (result.status === "success") {
          onAddNote(result.data);
          setNewNote("");
        } else {
          throw new Error(result.message || "Failed to add note");
        }
      } catch (err) {
        setError(err.message || "Failed to add note. Please try again.");
        console.error("Error in handleSubmit:", err);
      } finally {
        setIsLoading(false);
      }
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
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className={styles.loadingWrapper}>
                <SubmitLoading />
              </div>
            ) : (
              "הוסף הערה"
            )}
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
}
