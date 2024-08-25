// EvaluationForm/useStudents.js
import { useState, useEffect } from "react";
import { getAllSchoolClasses, getStudentsByClassId } from "@/functions/api";

export function useStudents(selectedClassId) {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClasses() {
      console.log("Starting to fetch classes");
      try {
        setLoading(true);
        console.log("Calling getAllSchoolClasses");
        const classesData = await getAllSchoolClasses();
        console.log("Received classes data:", classesData);
        setClasses(classesData.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Failed to fetch classes: " + err.message);
        setLoading(false);
      }
    }
    fetchClasses();
  }, []);

  useEffect(() => {
    async function fetchStudents() {
      if (!selectedClassId) {
        setStudents([]);
        return;
      }
      try {
        setLoading(true);
        const studentsData = await getStudentsByClassId(selectedClassId);
        console.log("Received students data:", studentsData);
        setStudents(studentsData.data.students);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to fetch students: " + err.message);
        setLoading(false);
      }
    }
    fetchStudents();
  }, [selectedClassId]);

  return { classes, students, loading, error };
}
