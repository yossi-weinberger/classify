// import axios from "axios";
import dotenv from "dotenv";
const SERVER_URL = "https://classify-backend.vercel.app";
// const SERVER_URL = "http://localhost:3001";

dotenv.config();
// require("dotenv").config();

export async function getAllSchoolClasses() {
  console.log("getAllSchoolClasses called");
  try {
    const response = await fetch(`${SERVER_URL}/classes`, {
      // next: { : 10, tags: ["SchoolClasses"] },
      cache: "no-cache",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
      },
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch or parse JSON:", error.message);
    throw new Error(error.message);
  }
}

export async function getStudentsByClassId(classId) {
  try {
    const url = `${SERVER_URL}/classes/${classId}`;
    // console.log("Fetching from URL:", url);

    const response = await fetch(url, {
      cache: "no-cache",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Error response body:", errorBody);
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorBody}`
      );
    }

    const data = await response.json();
    // console.log("Received data:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error in getStudentsByClassId:", error);
    throw error; // רק זורק את השגיאה המקורית ללא עטיפה נוספת
  }
}

export async function getStudentByClassAndStudentId(classId, studentId) {
  try {
    const url = `${SERVER_URL}/classes/${encodeURIComponent(
      classId
    )}/${encodeURIComponent(studentId)}`;

    // console.log("Fetching from URL:", url);

    const response = await fetch(url, {
      cache: "no-cache",
      headers: {
        Authorization: process.env.BEARER_TOKEN,
      },
    });
    // console.log("Bearer Token:", process.env.BEARER_TOKEN);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      throw new Error(`Server error: ${response.status}. ${errorText}`);
    }

    const data = await response.json();
    // console.log("Received data:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
}
export async function addPersonalNoteToStudent(idil, note) {
  console.log("addPersonalNoteToStudent called with:", { idil, note });

  if (!idil) {
    console.error("idil is undefined or null");
    throw new Error("Student ID (idil) is required");
  }

  try {
    const url = `${SERVER_URL}/students/${idil}/notes`;
    console.log("Sending request to:", url);
    console.log("Note text:", note);
    console.log("Bearer Token:", process.env.NEXT_PUBLIC_BEARER_TOKEN);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: note }),
    });

    console.log("Bearer Token:", process.env.NEXT_PUBLIC_BEARER_TOKEN);
    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      throw new Error(`Server error: ${response.status}. ${errorText}`);
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error adding personal note:", error);
    throw error;
  }
}

export async function addStudent(studentData) {
  console.log("addStudent called with:", studentData);

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
    console.log("Sending request to:", url);
    console.log("Updated student data:", updatedStudentData);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudentData),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      throw new Error(`Server error: ${response.status}. ${errorText}`);
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error adding new student:", error);
    throw error;
  }
}

export async function uploadImage(file) {
  if (!file) return null;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const url = `${SERVER_URL}/cloudinary/upload`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function deleteStudent(idil) {
  try {
    const response = await fetch(`${SERVER_URL}/students/${idil}`, {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
        "Content-Type": "application/json",
      },
    });

    let errorMessage = `Failed to delete student. Status: ${response.status}`;

    if (!response.ok) {
      try {
        // Try to parse error message from response
        const errorData = await response.json();
        errorMessage += ` - ${errorData.message || JSON.stringify(errorData)}`;
      } catch (jsonError) {
        // If parsing JSON fails, use text content
        const textContent = await response.text();
        errorMessage += ` - ${textContent}`;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log(
      "Response data from deleteStudent:",
      JSON.stringify(data, null, 2)
    );
    return data;
  } catch (error) {
    console.error("Error in deleteStudent:", error);
    throw error; // Re-throw the error for the component to handle
  }
}

export async function addClass(classData) {
  console.log("addClass called with:", classData);

  if (!classData.className || !classData.teacher) {
    console.error("fields is undefined or null");
    throw new Error("All fields are required");
  }

  // יצירת אובייקט חדש של נתוני התלמיד עם הערות מעודכנות
  const updatedClassData = {
    ...classData,
  };

  try {
    const url = `${SERVER_URL}/Classes/`;
    console.log("Sending request to:", url);
    console.log("Updated Class data:", updatedClassData);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedClassData),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      throw new Error(`Server error: ${response.status}. ${errorText}`);
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error adding new Class:", error);
    throw error;
  }
}

export async function addEvaluation(evaluationData) {
  // זו פונקציית דמה. בעתיד, כאן תהיה הלוגיקה לשליחת הנתונים לשרת.
  console.log("Sending evaluation data:", evaluationData);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 1000)
  );
}
