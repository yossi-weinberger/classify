import { handleApiRequest, SERVER_URL } from "../utils/apiUtils";

// Adds a new student evaluation
export async function addEvaluation(evaluationData) {
  console.log("addStudentEvaluation called with:", evaluationData);

  if (!evaluationData.student_idil || !evaluationData.evaluation_date) {
    console.error("Essential fields are undefined or null");
    throw new Error("Essential fields are required");
  }

  try {
    const url = `${SERVER_URL}/evaluations/`;
    // console.log("Sending request to:", url);
    // console.log("Evaluation data:", evaluationData);

    const data = await handleApiRequest(url, {
      method: "POST",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evaluationData),
    });

    // console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error adding new Student Evaluation:", error);
    throw error;
  }
}
