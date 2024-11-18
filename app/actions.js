"use server";

import { revalidatePath } from "next/cache";
import * as api from "@/functions/api";

// Cache Management
export async function revalidateStudentCache(classId) {
  revalidatePath(`/classes/${classId}`);
  revalidatePath("/students");
  revalidatePath("/");
}

// Data Fetching Actions
export async function fetchSchoolClasses() {
  try {
    const classesData = await api.getAllSchoolClasses();
    return classesData;
  } catch (error) {
    throw new Error("שגיאה בטעינת רשימת הכיתות");
  }
}

export async function fetchStudentsByClass(classId) {
  try {
    const data = await api.getStudentsByClassId(classId);
    return data;
  } catch (error) {
    throw new Error("שגיאה בטעינת רשימת התלמידים");
  }
}

// export async function fetchStudentDetails(classId, studentId) {
//   try {
//     const data = await api.getStudentByClassAndStudentId(classId, studentId);
//     return data;
//   } catch (error) {
//     throw new Error("שגיאה בטעינת פרטי התלמיד");
//   }
// }

// Student Management Actions
export async function addStudentAction(studentData) {
  try {
    const result = await api.addStudent(studentData);
    return {
      success: true,
      data: result,
      message: `התלמיד ${studentData.firstName} ${studentData.lastName} נוסף בהצלחה!`,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "שגיאה בהוספת תלמיד",
    };
  }
}

export async function deleteStudentAction(studentId) {
  try {
    await api.deleteStudent(studentId);
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function addPersonalNoteAction(idil, note) {
  try {
    const result = await api.addPersonalNoteToStudent(idil, note);
    return { success: true, data: result.data };
  } catch (error) {
    return { error: error.message };
  }
}

// File Management Actions
export async function uploadImageAction(formData) {
  try {
    const imageUrl = await api.uploadImage(formData.get("file"));
    return {
      success: true,
      url: imageUrl,
      message: "התמונה הועלתה בהצלחה",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Class Management Actions
export async function addClassAction(formData) {
  try {
    const result = await api.addClass(formData);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "שגיאה בהוספת הכיתה",
    };
  }
}

export async function submitEvaluationAction(formData) {
  try {
    const result = await api.addEvaluation(formData);
    return {
      success: true,
      data: result,
      message: "ההערכה נשלחה בהצלחה",
    };
  } catch (error) {
    console.error("Error in submitEvaluationAction:", error);
    return {
      success: false,
      error: error.message || "שגיאה בשליחת ההערכה",
    };
  }
}

// Complex Actions
export async function addStudentWithImageAction(formData) {
  try {
    const studentData = {
      ...formData.studentData,
      idil: Number(formData.studentData.idil),
      fullName:
        `${formData.studentData.firstName} ${formData.studentData.lastName}`.trim(),
      ...(formData.imageUrl && { img: formData.imageUrl }),
    };

    const result = await api.addStudent(studentData);
    revalidatePath("/students");
    revalidatePath("/classes");

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error.message || "שגיאה בהוספת תלמיד",
    };
  }
}
