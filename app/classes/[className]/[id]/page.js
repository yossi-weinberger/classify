import { getStudentByClassAndStudentId } from "@/functions/api";
import StudentDetails from "@/components/StudentDetails/StudentDetails";

export default async function StudentPage({ params }) {
  const { className, id } = params;

  try {
    const studentData = await getStudentByClassAndStudentId(className, id);

    if (!studentData || !studentData.data) {
      throw new Error("Invalid student data");
    }

    return (
      <div className="student-page">
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
