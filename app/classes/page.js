import SchoolClassesGrid from "@/components/SchoolClassesGrid/SchoolClassesGrid";
import { getAllSchoolClasses } from "@/functions/apiCalls";
import Image from "next/image";

export default async function SchoolClassesPage() {
  const SchoolClasses = await getAllSchoolClasses();
  // console.log(SchoolClasses);

  return (
    <div>
      <SchoolClassesGrid SchoolClasses={SchoolClasses} />
    </div>
  );
}

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import SchoolClassesGrid from "@/components/SchoolClassesGrid/SchoolClassesGrid";
// import { getAllSchoolClasses } from "@/functions/apiCalls";
// import Loading from "@/components/loading/loading";

// export default function SchoolClassesPage() {
//   const [schoolClasses, setSchoolClasses] = useState(null);
//   const [error, setError] = useState(null);
//   const [retryCount, setRetryCount] = useState(0);

//   const fetchData = useCallback(async () => {
//     try {
//       const data = await getAllSchoolClasses();
//       setSchoolClasses(data);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching school classes:", err);
//       setError("לא הצלחנו לטעון את הנתונים. מנסה שוב...");
//       setRetryCount((prevCount) => prevCount + 1);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         fetchData();
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [error, fetchData, retryCount]);

//   if (error) {
//     return (
//       <div>
//         {error}
//         {retryCount > 1 && (
//           <>
//             <Loading />
//             <p>אנחנו מביאים מהשרת את המידע העדכני, זה יכול לקחת קצת זמן</p>
//           </>
//         )}
//       </div>
//     );
//   }

//   // if (!schoolClasses) {
//   //   return <Loading />;
//   // }

//   return <SchoolClassesGrid SchoolClasses={schoolClasses} />;
// }

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import SchoolClassesGrid from "@/components/SchoolClassesGrid/SchoolClassesGrid";
// import { getAllSchoolClasses } from "@/functions/apiCalls";

// export default function SchoolClassesPage() {
//   const [schoolClasses, setSchoolClasses] = useState(null);
//   const [error, setError] = useState(null);
//   const [retryCount, setRetryCount] = useState(0);

//   const fetchData = useCallback(async () => {
//     try {
//       const data = await getAllSchoolClasses();
//       setSchoolClasses(data);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching school classes:", err);
//       setError("לא הצלחנו לטעון את הנתונים. מנסה שוב...");
//       setRetryCount((prevCount) => prevCount + 1);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         fetchData();
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [error, fetchData, retryCount]);

//   if (error) {
//     return (
//       <div>
//         {error}
//         <p>ניסיון מספר: {retryCount}</p>
//       </div>
//     );
//   }

//   if (!schoolClasses) {
//     return <div>טוען...</div>;
//   }

//   return <SchoolClassesGrid SchoolClasses={schoolClasses} />;
// }

// import SchoolClassesGrid from "@/components/SchoolClassesGrid/SchoolClassesGrid";
// import { getAllSchoolClasses } from "@/functions/apiCalls";
// import Image from "next/image";

// export default async function SchoolClassesPage() {
//   const SchoolClasses = await getAllSchoolClasses();
//   // console.log(SchoolClasses);

//   return (
//     <div>
//       <SchoolClassesGrid SchoolClasses={SchoolClasses} />
//     </div>
//   );
// }
