"use client";

import { nanoid } from "nanoid";
import Link from "next/link";
import styles from "./SchoolClassesGrid.module.css";
import { useState, useEffect } from "react";
import { sortSchoolClasses } from "@/functions/global_functions";
import { Sort_search } from "@/components/sort-search/sort-search";

export default function SchoolClassesGrid({ SchoolClasses }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const SchoolClassesToShow =
    isClient && Array.isArray(SchoolClasses?.data)
      ? SchoolClasses.data
          .filter((classItem) =>
            classItem?.className
              ?.trim()
              .toLowerCase()
              .includes((search || "").trim().toLowerCase())
          )
          .sort((a, b) => sortSchoolClasses(a, b, sortBy))
          .map((classItem) => <GridItem key={nanoid()} item={classItem} />)
      : [];

  if (!isClient) {
    return <div className={styles.loading}>טוען...</div>;
  }

  return (
    <div className={styles.gridContainer}>
      <Sort_search
        sortBy={sortBy}
        setSortBy={setSortBy}
        setSearch={setSearch}
      />

      <div className={styles.grid}>
        {SchoolClassesToShow.length > 0 ? (
          SchoolClassesToShow
        ) : (
          <p>לא נמצאו כיתות</p>
        )}
      </div>
    </div>
  );
}

function GridItem({ item }) {
  return item && item._id ? (
    <Link href={`/classes/${item._id}`}>
      <div className={styles.gridItem}>
        {item.img && <img src={item.img} alt={item.className} />}
        <div>
          <h2>כיתה {item.className}</h2>
          <p>מורה: {item.teacher}</p>
          <div className={styles.readMore}>
            <button>פרטים</button>
          </div>
        </div>
      </div>
    </Link>
  ) : null;
}

// "use client";

// import { nanoid } from "nanoid";
// import Link from "next/link";
// import "./SchoolClassesGrid.css";
// import { useState } from "react";
// import { sortSchoolClasses } from "@/functions/global_functions";
// import { Sort_search } from "@/components/sort-search/sort-search";

// export default function SchoolClassesGrid({ SchoolClasses }) {
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState(0);

//   const SchoolClassesToShow = Array.isArray(SchoolClasses?.data)
//     ? SchoolClasses.data
//         .filter((classItem) =>
//           classItem?.className
//             ?.trim()
//             .toLowerCase()
//             .includes((search || "").trim().toLowerCase())
//         )
//         .sort((a, b) => sortSchoolClasses(a, b, sortBy))
//         .map((classItem) => <GridItem key={nanoid()} item={classItem} />)
//     : [];

//   return (
//     <div className="grid-container">
//       <Sort_search
//         sortBy={sortBy}
//         setSortBy={setSortBy}
//         setSearch={setSearch}
//       />

//       <div className="grid">
//         {SchoolClassesToShow.length > 0 ? (
//           SchoolClassesToShow
//         ) : (
//           <p>לא נמצאו כיתות</p>
//         )}
//       </div>
//     </div>
//   );
// }

// function GridItem({ item }) {
//   return item && item._id ? (
//     <Link href={`/classes/${item._id}`}>
//       <div className="grid-item">
//         {item.img && <img src={item.img} alt={item.className} />}
//         <div>
//           <h2>'כיתה {item.className}</h2>
//           <p>מורה: {item.teacher}</p>
//           <div className="read-more">
//             <button>פרטים</button>
//           </div>
//         </div>
//       </div>
//     </Link>
//   ) : null;
// }
