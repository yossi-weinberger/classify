import { handleApiRequest, SERVER_URL } from "../utils/apiUtils";

// Adds a new class
export async function addClass(classData) {
  // console.log("addClass called with:", classData);

  if (!classData.className || !classData.teacher) {
    console.error("fields is undefined or null");
    throw new Error("All fields are required");
  }

  try {
    const url = `${SERVER_URL}/Classes/`;
    // console.log("Sending request to:", url);
    // console.log("Updated Class data:", classData);

    const data = await handleApiRequest(url, {
      method: "POST",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    });

    return data;
  } catch (error) {
    console.error("Error adding new Class:", error);
    throw error;
  }
}

// Fetches all school classes
export async function getAllSchoolClasses() {
  // console.log("getAllSchoolClasses called");
  try {
    const url = `${SERVER_URL}/classes`;
    const data = await handleApiRequest(url, {
      cache: "no-cache",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch school classes:", error);
    throw error;
  }
}

// Fetches students by class ID
export async function getStudentsByClassId(classId) {
  try {
    const url = `${SERVER_URL}/classes/${classId}`;
    const data = await handleApiRequest(url, {
      cache: "no-cache",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
      },
    });
    return data;
  } catch (error) {
    console.error("Error in getStudentsByClassId:", error);
    throw error;
  }
}
