import axios from "axios";
import dotenv from "dotenv";
const SERVER_URL = "https://classify-backend.vercel.app";
// const SERVER_URL = "http://localhost:3001";

dotenv.config();
// require("dotenv").config();

export async function getAllSchoolClasses() {
  try {
    const response = await fetch(`${SERVER_URL}/classes`, {
      // next: { : 10, tags: ["SchoolClasses"] },
      cache: "no-cache",
      headers: {
        Authorization: process.env.BEARER_TOKEN,
      },
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    // console.log(
    //   "Response data from getAllSchoolClasses:",
    //   JSON.stringify(data, null, 2)
    // );
    // console.log(data);
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
      headers: {
        Authorization: process.env.BEARER_TOKEN,
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
// export async function addPersonalNoteToStudent(idil, noteText) {
//   console.log("addPersonalNoteToStudent called with:", { idil, noteText });
//   try {
//     const url = `${SERVER_URL}/classes/students/${idil}/notes`;
//     console.log("Sending request to:", url);
//     console.log("Note text:", noteText);
//     console.log("Authorization token:", process.env.BEARER_TOKEN);

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: process.env.BEARER_TOKEN,
//       },
//       body: JSON.stringify({ note: noteText }),
//     });

//     console.log("Response status:", response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Server response:", errorText);
//       throw new Error(`Server error: ${response.status}. ${errorText}`);
//     }

//     const data = await response.json();
//     console.log("Response data:", data);
//     return data;
//   } catch (error) {
//     console.error("Error adding personal note:", error);
//     throw error;
//   }
// }

// export async function getstudentById(id) {
//   try {
//     const response = await fetch(`${SERVER_URL}/students/${id}`, {
//       headers: {
//         Authorization: process.env.BEARER_TOKEN,
//       },
//     });

//     // בדיקת סטטוס התגובה
//     if (!response.ok) {
//       throw new Error(`Server error: ${response.status}`);
//     }

//     // ניסיון לפענח את התגובה כ-JSON
//     const data = await response.json();
//     // console.log(
//     //   "Response data from getstudentById:",
//     //   JSON.stringify(data, null, 2)
//     // );

//     return data;
//   } catch (error) {
//     console.error("Failed to fetch or parse JSON:", error.message);
//     throw new Error(error.message);
//   }
// }

// export async function getstudentById(id) {
//   try {
//     const response = await fetch(`${SERVER_URL}/students/${id}`, {
//       headers: {
//         Authorization: process.env.BEARER_TOKEN,
//       },
//     });
//     const data = await response.json();
//     console.log("Response data from getstudentById:", data);
//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function getAllstudents() {
//   try {
//     const response = await fetch(`${SERVER_URL}/students`, {
//       // next: { : 10, tags: ["SchoolClasses"] },
//       cache: "no-cache",
//       headers: {
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYxYmM0YTBkYzcwMTA3N2Y2NTAxNGYiLCJpYXQiOjE3MTA5MjcwOTB9.IZ4yEMeOqbHD3J8_XxGn6afXeU1XLyFqM8KVg5vbITE",
//       },
//     });
//     const data = await response.json();
//     console.log("data1:", data);
//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function createNewclass(classData) {
//   try {
//     const response = await axios.post(
//       `${SERVER_URL}/SchoolClasses`,
//       classData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: process.env.BEARER_TOKEN,
//         },
//       }
//     );
//     if (response.status !== 200) {
//       const message = await response.text();
//       throw new Error(message);
//     }
//     return { data: response.data, status: "success" };
//   } catch (error) {
//     console.error("Error creating new class:", error);
//     throw error;
//   }
// }
