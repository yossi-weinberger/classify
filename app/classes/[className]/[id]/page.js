import StudentDetails from "@/components/studentPage/studentPage";
import { getStudentByClassAndStudentId } from "@/functions/apiCalls";

export default async function StudentPage({ params }) {
  const { className, id } = params;
  console.log("Params:", params);

  try {
    const studentData = await getStudentByClassAndStudentId(className, id);

    if (!studentData || !studentData.data) {
      throw new Error("Invalid student data");
    }

    return (
      <div>
        <StudentDetails
          student={studentData.data.student}
          classInfo={studentData.data.class}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in StudentPage:", error.message);
    return <div>Failed to load student data. Please try again later.</div>;
  }
}
