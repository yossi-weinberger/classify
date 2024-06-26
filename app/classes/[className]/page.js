import StudentsGrid from "@/components/studentsGrid/studentsGrid";
import { getStudentsByClassId } from "@/functions/apiCalls";

export default async function StudentsPage({ params: { className } }) {
  try {
    const studentsData = await getStudentsByClassId(className);

    if (!studentsData || !studentsData.data) {
      throw new Error("Invalid data received from server");
    }

    return (
      <div>
        <StudentsGrid
          students={studentsData.data.students}
          classInfo={studentsData.data.class}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in StudentsPage:", error);
    return (
      <div>
        <h1>שגיאה</h1>
        <p>אירעה שגיאה בטעינת נתוני הכיתה. אנא נסה שוב מאוחר יותר.</p>
        <p>פרטי השגיאה: {error.message}</p>
      </div>
    );
  }
}
