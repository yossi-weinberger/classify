import { handleApiRequest, SERVER_URL } from "../utils/apiUtils";

// Fetches a specific student by class ID and student ID
export async function getStudentByClassAndStudentId(classId, studentId) {
  try {
    const url = `${SERVER_URL}/classes/${encodeURIComponent(
      classId
    )}/${encodeURIComponent(studentId)}`;

    const data = await handleApiRequest(url, {
      cache: "no-cache",
      headers: {
        Authorization: process.env.BEARER_TOKEN,
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
}

// Adds a personal note to a student
export async function addPersonalNoteToStudent(idil, note) {
  // console.log("addPersonalNoteToStudent called with:", { idil, note });

  if (!idil) {
    console.error("idil is undefined or null");
    throw new Error("Student ID (idil) is required");
  }

  try {
    const url = `${SERVER_URL}/students/${idil}/notes`;
    // console.log("Sending request to:", url);
    // console.log("Note text:", note);
    // console.log("Bearer Token:", process.env.NEXT_PUBLIC_BEARER_TOKEN);

    const data = await handleApiRequest(url, {
      method: "POST",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: note }),
    });

    // console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error adding personal note:", error);
    throw error;
  }
}

// Adds a new student
export async function addStudent(studentData) {
  // console.log("addStudent called with:", studentData);

  if (!studentData.idil) {
    console.error("idil is undefined or null");
    throw new Error("Student ID (idil) is required");
  }

  // טיפול בהערות האישיות
  let personalNotes = [];
  if (studentData.personalNotes) {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    personalNotes = [
      {
        date: formattedDate,
        note: studentData.personalNotes,
      },
    ];
  }

  // יצירת אובייקט חדש של נתוני התלמיד עם הערות מעודכנות
  const updatedStudentData = {
    ...studentData,
    personalNotes: personalNotes,
  };

  try {
    const url = `${SERVER_URL}/students/`;
    // console.log("Sending request to:", url);
    // console.log("Updated student data:", updatedStudentData);

    const data = await handleApiRequest(url, {
      method: "POST",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudentData),
    });

    // console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error adding new student:", error);
    throw error;
  }
}

// Deletes a student
export async function deleteStudent(studentId) {
  try {
    const url = `${SERVER_URL}/students/${studentId}`;
    const data = await handleApiRequest(url, {
      method: "DELETE",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
      },
    });
    return data;
  } catch (error) {
    console.error("Error in deleteStudent:", error);
    throw error;
  }
}
