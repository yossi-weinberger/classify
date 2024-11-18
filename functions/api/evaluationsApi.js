import { handleApiRequest, SERVER_URL } from "../utils/apiUtils";

// Adds a new student evaluation
export async function addEvaluation(evaluationData) {
  console.log("addStudentEvaluation called with:", evaluationData);

  if (!evaluationData.student_idil || !evaluationData.evaluation_date) {
    throw new Error("חסרים שדות חובה");
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
    return {
      success: true,
      data: data,
      message: `ההערכה עבור ${evaluationData.first_name} ${evaluationData.last_name} נשלחה בהצלחה`,
    };
  } catch (error) {
    console.error("error: " + error.message);
    throw new Error("שגיאה בשליחת ההערכה: " + error.message);
  }
}
