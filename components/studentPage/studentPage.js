// import Image from "next/image";
// import "./studentPage.css";

// function isValidImageUrl(url) {
//   if (!url) return false;
//   if (url.startsWith("/")) return true;
//   try {
//     new URL(url);
//     return true;
//   } catch {
//     return false;
//   }
// }

// export default function StudentDetails({ student, classInfo }) {
//   if (!student) {
//     return <div>Invalid student data</div>;
//   }

//   const imageUrl = isValidImageUrl(student.img)
//     ? student.img
//     : "/placeholder-image.jpg";

//   return (
//     <div className="students-page">
//       <div className="column center">
//         <Image
//           className="img"
//           width={300}
//           height={300}
//           src={imageUrl}
//           alt={`${student.firstName} ${student.lastName}`}
//         />
//         <div className="column rtl">
//           <h1>
//             {student.firstName} {student.lastName}
//           </h1>
//           <h2>כיתה: {classInfo.className}</h2>
//           <p>תאריך לידה: {student.dateOfBirth}</p>
//           <h3>פרטי הורים:</h3>
//           <p>
//             אבא: {student.fatherName} (טלפון: {student.fatherPhone})
//           </p>
//           <p>
//             אמא: {student.motherName} (טלפון: {student.motherPhone})
//           </p>
//           <h3>כתובת:</h3>
//           <p>
//             {student.address.street}, {student.address.city}{" "}
//             {student.address.postalCode}
//           </p>
//           <h3>הערות אישיות:</h3>
//           <ul>
//             {student.personalNotes.map((note, index) => (
//               <li key={index}>
//                 <strong>{note.date}:</strong> {note.note}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
